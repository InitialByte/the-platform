import * as express from 'express';
import * as cookieParser from 'cookie-parser';
import {json, urlencoded} from 'express';
import {readFileSync} from 'fs';
import {createServer} from 'https';
import {port} from '../package.json';
import {bootstrapRBAC} from './core/service';
import {apiRouter} from './rest/index';
import {webSocketServer} from './ws/index';

declare global {
  namespace NodeJS {
    interface Global {
      ac: any;
    }
  }
}

const app = express();
const SUCCESS_STATUS = 200;
const DELIMITER = '------------------------';
const certsPath = '../../../configs/docker/nginx/certs/';
const URL = `https://localhost:${port}`;

const callbackOnStart = (): void => {
  console.log('Api-mock server is running.');
  console.log(`rest api: ${URL}/api`);
  console.log(`websocket: ${URL}/ws`);
  console.log(DELIMITER);
  console.log(new Date().getTimezoneOffset());

  global.ac = bootstrapRBAC();
};

app.disable('x-powered-by');
app.use(json());
app.use(cookieParser());
app.use(
  urlencoded({
    extended: true,
  }),
);

app.use(({method, path, params, cookies, query}, _, next) => {
  console.log('%s %s', method, path);

  if (Object.keys(params).length > 0) {
    console.log('Params:');
    console.dir(params);
  }

  if (Object.keys(query).length > 0) {
    console.log('Query:');
    console.dir(query);
  }

  if (cookies) {
    console.log('Cookies:');
    console.dir(cookies);
  }

  console.log(DELIMITER);

  next();
});

app.use('/static', express.static(`${__dirname}/../public`));
app.use('/api', apiRouter);

app.get('/', (_, res) => {
  res.status(SUCCESS_STATUS).json({
    data: 'Api mock server. It works!',
  });
});

const httpsOptions = {
  key: readFileSync(`${certsPath}wildcard.localhost.key.pem`),
  cert: readFileSync(`${certsPath}wildcard.localhost.cert.pem`),
};

const server = createServer(httpsOptions, app);
webSocketServer(server);
server.listen(port, callbackOnStart);
