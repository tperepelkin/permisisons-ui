
import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as errorhandler from 'strong-error-handler';
import swaggerUI from 'swagger-ui-express';
// import swDocument from './openapi';
import apiRouter from './routes/navigationRoutes';

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({ limit: '5mb' }));

// enable corse for all origins
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Expose-Headers", "x-total-count");
    res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE,PATCH");
    res.header("Access-Control-Allow-Headers", "Content-Type,authorization");

    next();
});

app.use(express.static('public'));
app.use(apiRouter);

app.use(errorhandler({
    debug: process.env.ENV !== 'prod',
    log: true,
}));

export default app;