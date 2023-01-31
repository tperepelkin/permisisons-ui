import { Sequelize } from 'sequelize-typescript';
import Adsb from './models/ads_b';
import Mlat from './models/mlat';
import Psr from './models/psr';
import User from './models/user';
import Group from './models/group';
import UserGroup from './models/usergroup';

import Airfield from './models/airfield';
import FileInfo from './models/fileInfo';
import Zone from './models/zone';
import ZoneBoundary from './models/zoneBoundary';
import ZonePoint from './models/zonePoint';

console.log('Инициализация базы данных');

const sequelize = new Sequelize({
  database: 'BVS',
  dialect: 'mysql',
  username: 'bvs',
  password: 'bvsbvsbvs',
  host: '127.0.0.1',
  port: 3306,
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 1000,
  },
  logging:false,
});

sequelize.addModels([Adsb, Mlat, Psr, User, Group, UserGroup, Airfield, FileInfo, Zone, ZoneBoundary, ZonePoint]);
sequelize.sync();
console.log('Баз аданных инициализирована');

export default sequelize;