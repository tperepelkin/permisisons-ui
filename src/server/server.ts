
import { createServer } from 'http';
import app from './app';
import sequelize from './database';
import FileScheduler from './datasources/file/scheduler';
import SqlScheduler from './datasources/sql/scheduler';

const port = 8000;
// const port = process.env.PORT || 8000;

(async () => {
    await sequelize.sync();
    createServer(app).listen(port, () => {
        console.log(`Веб-сервис запущен на порте: ${port}`);

        // new SqlScheduler();
        // new FileScheduler();
    });
})();
