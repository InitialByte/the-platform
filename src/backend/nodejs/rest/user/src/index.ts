import * as express from 'express';
import {Application} from 'express';
import {createServer} from 'http';
import {registerService} from '@the_platform/nodejs-core';
import {router} from './routes';
import * as packageImport from '../package.json';

const {name} = packageImport;
const {APP_HOST = '127.0.0.1', APP_PORT = '8080'} = process.env;
const checkURL = `http://${APP_HOST}:${APP_PORT}/user/health`;

const app: Application = express();
app.disable('x-powered-by');

app.use('/user', router);

const bootstrap = (): void => {
  registerService({
    name,
    address: APP_HOST,
    port: Number(APP_PORT),
    check: {
      http: checkURL,
      interval: '10s',
    },
  }).catch(console.error);
};

createServer({}, app).listen(Number(APP_PORT), APP_HOST, (): void => {
  bootstrap();
  console.log(`Microservice "${name}" is running, ${checkURL}`);
});
