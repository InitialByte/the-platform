/**
 * Request looks like:
 *
 * ### REST
 * /api/<API_VERSION>/<MICROSERVICE_NAME>/<MICROSERVICE_METHOD>
 *
 * ### WebSocket
 * /ws/<API_VERSION>/<MICROSERVICE_NAME>/<MICROSERVICE_METHOD>
 *
 * e.g.
 * /api/v1/auth/logout
 * /api/v3/countries/list
 */

import {Router} from 'express';
import {auth} from './auth/index';
import {user} from './user/index';
import {token} from './token/index';

export const apiRouter = Router();
const apiVersion = 1;

apiRouter.use(`/v${apiVersion}/auth`, auth);
apiRouter.use(`/v${apiVersion}/user`, user);
apiRouter.use(`/v${apiVersion}/token`, token);
