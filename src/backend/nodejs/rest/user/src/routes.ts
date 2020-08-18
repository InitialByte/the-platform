import {Router} from 'express';
import {checkRole, isAuthenticated} from '@the_platform/nodejs-core';
import {healthController} from './controller/health';
import {allController} from './controller/all';
import {createController} from './controller/create';
import {readController} from './controller/read';
import {updateController} from './controller/update';
import {deleteController} from './controller/delete';

export const router = Router();

router.get('/health', healthController);

router.get(
  '/',
  [isAuthenticated, checkRole('readAny', RBAC_GRANT_USER)],
  allController,
);

router.get(
  '/:id',
  [isAuthenticated, checkRole('readAny', RBAC_GRANT_USER)],
  readController,
);

router.post(
  '/',
  [isAuthenticated, checkRole('createAny', RBAC_GRANT_USER)],
  createController,
);

router.put(
  '/:id',
  [isAuthenticated, checkRole('updateAny', RBAC_GRANT_USER)],
  updateController,
);

router.delete(
  '/:id',
  [isAuthenticated, checkRole('deleteAny', RBAC_GRANT_USER)],
  deleteController,
);
