console.log('Запуск скрипта инициализации');

import process from 'process';
import sequelize from '../src/server/database';
import User from '../src/server/database/models/user';
import Group from '../src/server/database/models/group';

const BASE_ENGENEER_LOGIN_NAME = 'engeneer1';
const TEST_FIRST_DISPATCHER_LOGIN_NAME = 'dispatcher1';
const TEST_FIRST_PILOT_LOGIN_NAME = 'pilot1';
const TEST_SECOND_PILOT_LOGIN_NAME = 'pilot2';
const TEST_OWNER_LOGIN_NAME = 'owner1';

const ENGENEER_GROUP_NAME = 'engeneer';
const DISPATCHER_GROUP_NAME = 'dispatcher';
const PILOT_GROUP_NAME = 'pilot';
const OWNER_GROUP_NAME = 'owner';

const addUserToGroup = async (userName: string, groupName: string) => {
    const user = await User.scope('groups').findOne({
        where: {
            login: userName,
        },
    });

    if (user) {
        // Базовый инженер не в группе инженеров ? Добавим
        if (!user?.groups?.length) {
            const group = await Group.findOne({
                where: {
                    name: groupName,
                },
            });

            if (group) {
                let groups = user?.groups ?? [];
                await user.update({ groups: [...groups] }, { where: { login: user.login } });
                await user.reload();
                return user;
            }
        }
    } else {
        console.error(`Пользователь ${userName} не существует. Проверьте целостность базы`);
        return null;
    }

    return user;
}

(async function main() {
    console.log('Инициализируем sequelize');
    await sequelize.sync();
    console.log('Инициализация sequelize закончена');

    // // Группа инженеров (администраторов)
    const [engeneersGroup] = await Group.findOrCreate({
        where: { name: ENGENEER_GROUP_NAME },
        defaults: {
            name: ENGENEER_GROUP_NAME,
            comment: 'группа администраторов',
        },
    });

    // Группа диспетчеров
    const [dispatchersGroup] = await Group.findOrCreate({
        where: { name: DISPATCHER_GROUP_NAME },
        defaults: {
            name: DISPATCHER_GROUP_NAME,
            comment: 'группа диспетчеров',
        },
    });

    // Группа внешних пилотов
    const [pilotsGroup] = await Group.findOrCreate({
        where: { name: PILOT_GROUP_NAME },
        defaults: {
            name: PILOT_GROUP_NAME,
            comment: 'группа внешних пилотов',
        },
    });

    // Группа владельцев БПЛА
    const [ownersGroup] = await Group.findOrCreate({
        where: { name: OWNER_GROUP_NAME },
        defaults: {
            name: OWNER_GROUP_NAME,
            comment: 'группа владельцев беспитлотников',
        },
    });

    // Базовый пользователь с ролью администратора
    await User.findOrCreate({
        where: { login: BASE_ENGENEER_LOGIN_NAME, },
        defaults: {
            login: BASE_ENGENEER_LOGIN_NAME,
            password: 'password',
            firstName: 'Инженер',
            lastName: 'Администраторов',
            wrongAttempts: 0,
            groups: [engeneersGroup],
        },
    });

    // Тестовый пользователь с ролью диспетчера
    await User.findOrCreate({
        where: { login: TEST_FIRST_DISPATCHER_LOGIN_NAME },
        defaults: {
            login: TEST_FIRST_DISPATCHER_LOGIN_NAME,
            password: 'password',
            firstName: 'Диспетчер',
            lastName: 'Бэвээсов',
            wrongAttempts: 0,
            groups: [dispatchersGroup],
        },
    });

    // Тестовый пользователь с ролью пилота
    await User.findOrCreate({
        where: { login: TEST_FIRST_PILOT_LOGIN_NAME },
        defaults: {
            login: TEST_FIRST_PILOT_LOGIN_NAME,
            password: 'password',
            firstName: 'Первый Пилот',
            lastName: 'Летунов',
            wrongAttempts: 0,
            groups: [pilotsGroup],
        },
    });

    // Тестовый пользователь с ролью пилота
    await User.findOrCreate({
        where: { login: TEST_SECOND_PILOT_LOGIN_NAME },
        defaults: {
            login: TEST_SECOND_PILOT_LOGIN_NAME,
            password: 'password',
            firstName: 'Второй Пилот',
            lastName: 'Летунович',
            wrongAttempts: 0,
            groups: [pilotsGroup],
        },
    });

    // Тестовый пользователь с ролью владельца БПЛА
    await User.findOrCreate({
        where: { login: TEST_OWNER_LOGIN_NAME },
        defaults: {
            login: TEST_OWNER_LOGIN_NAME,
            password: 'password',
            firstName: 'Повелитель',
            lastName: 'Беспилотников',
            wrongAttempts: 0,
            groups: [ownersGroup],
        },
    });

    // Добавим пользователю-диспетчеру роль диспетчера
    await addUserToGroup(TEST_FIRST_DISPATCHER_LOGIN_NAME, DISPATCHER_GROUP_NAME);
    // Добавим пользователю, первому пилоту, роль пилота
    await addUserToGroup(TEST_FIRST_PILOT_LOGIN_NAME, PILOT_GROUP_NAME);
    // Добавим пользователю, второму пилоту, роль пилота
    await addUserToGroup(TEST_SECOND_PILOT_LOGIN_NAME, PILOT_GROUP_NAME);
    // Добавим пользователю, владельцу БПЛА, роль владельца
    await addUserToGroup(TEST_OWNER_LOGIN_NAME, OWNER_GROUP_NAME);

    console.info('Скрипт инициализации закончен');
    process.exit();
})();