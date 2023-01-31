import fs from 'fs';
import { Attributes, BulkCreateOptions, CreationAttributes, DestroyOptions, Model } from 'sequelize';
import lineByLine from 'n-readlines';
import FileInfo from "../../database/models/fileInfo";
import { VNIIRAFilesConfig } from './IVNIIRAFilesConfig';
import sequelize from '../../database';
import { lastFileData } from './scheduler';

export const checkFile = async (dir: string, filename: string): Promise<boolean> => {
    // Проверим, существует ли каталог с файлами
    try {
        await fs.promises.access(dir);
    } catch (e) {
        console.error(`Каталог ${dir} не существует`);
        return false;
    }

    // Прочитаем список файлов в каталоге
    let files: Array<String> = [];
    try {
        files = await fs.promises.readdir(dir);
    } catch (e) {
        console.error(`Не могу прочитать список файлов из каталога ${dir}`);
        return false;
    }

    // Если файл существует
    if (!files?.includes(VNIIRAFilesConfig.files.airdromes)) {
        console.error(`Не могу найти файл ${filename} в каталоге ${dir}`);
        return false;
    }

    const filePath = `${dir}/${filename}`;
    try {
        await fs.promises.access(filePath);
    } catch (e) {
        console.error(`Задайте корректное имя файла! Текущее значение: ${filePath}`);
        return false;
    }

    return true;
}

export const updateFileInfo = async (dir: string, filename: string): Promise<boolean> => {
    let shouldUpdate = false;

    const filePath = `${dir}/${filename}`;
    const { size, mtime, } = await fs.promises.stat(filePath);

    const prevFileInfo = await FileInfo.findOne({
        where: { name: filename, },
        attributes: ['name', 'fileSize', 'lastDateUpdate',],
    });

    if (prevFileInfo === null) {
        // В таблице нет информации по искомому файлу, тогда добавим содержание
        const model = new FileInfo({ name: filename, fileSize: size, lastDateUpdate: mtime, });
        model.save();

        shouldUpdate = true;
        console.log('Добавляем данные а таблицу первый раз');
    } else if (mtime.getTime() !== prevFileInfo.lastDateUpdate.getTime() || size !== prevFileInfo.fileSize) {
        // Если размер файла или дата последнего изменения отличаются, тогда добавим содержание
        shouldUpdate = false;
    }

    return shouldUpdate;
};

export const loadContent = async <S, T>(
    filePath: string
    , transform: (line: string) => S
    , transformToDbAttributes: (record: S) => T
    , bulkCreate: <M extends Model>(
        records: ReadonlyArray<CreationAttributes<M>>,
        options?: BulkCreateOptions<Attributes<M>>
    ) => Promise<Model<any, any>[]>
    , destroy: <M extends Model>(
        options?: DestroyOptions<Attributes<M>>
    ) => Promise<number>
): Promise<Array<T>> => {
    console.log(`Загрузка файла ${filePath} в базу`);

    const records: Array<T> = [];
    let line;
    const liner = new lineByLine(filePath)
    // Пропустим заголовок с именами колонок
    line = liner.next();

    if (line) {
        // Читаем построчно из файла
        while (line = liner.next()) {
            // Получим записи с типом клиентской записи по одной, преобразуя строки из из читаемого файла
            const fieldRecord = transform(line.toString('utf8'));
            // Преобразуем запись с клиентским типом в запись базы данных
            const fieldDbData = transformToDbAttributes(fieldRecord);
            // Накапливаем записи
            records.push(fieldDbData);
        }

        try {
            const transaction = await sequelize.transaction(async (t) => {
                // Удалим старые данные из таблицы
                await destroy({
                    where: {},
                    transaction: t,
                });
                console.log('Records', records);
                // Добавим массово новые записи из распарсенного файла
                await bulkCreate((records as any), { transaction: t, ignoreDuplicates: true, });
            });
            transaction
        } catch (e) {
            console.error(`Ошибка при обновлении таблицы из файла ${filePath}`, e);
            return [];
        }
    }

    return records;
};
