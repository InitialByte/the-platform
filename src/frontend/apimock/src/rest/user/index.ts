import {Router} from 'express';
import {checkRole, isAuthenticated} from '../../core';
import {RBAC_GRANT_USER} from '../../constants';
import * as faker from 'faker';

export const user = Router();
const SUCCESS_STATUS = 200;
const NUMBER_OF_USERS = 100;

// List of users
// /api/v1/user
user.get(
  '/',
  [isAuthenticated, checkRole('readAny', RBAC_GRANT_USER)],
  (_, res): void => {
    res.status(SUCCESS_STATUS).json({
      data: [...Array(NUMBER_OF_USERS)].map(() => ({
        id: faker.random.uuid(),
        fullname: faker.name.findName(),
        email: faker.internet.email(),
        createdAt: faker.date.past(),
      })),
    });
  },
);

// Get an user
// /api/v1/user/1
user.get(
  '/:id',
  [isAuthenticated, checkRole('readAny', RBAC_GRANT_USER)],
  (_, res): void => {
    res.status(SUCCESS_STATUS).json({
      data: {
        fullname: faker.name.findName(),
        email: faker.internet.email(),
        createdAt: faker.date.past(),
      },
    });
  },
);

// Creating new user
// /api/v1/user
user.post(
  '/',
  [isAuthenticated, checkRole('createAny', RBAC_GRANT_USER)],
  (_, res): void => {
    res.status(SUCCESS_STATUS).send();
  },
);

// Updating a user
// /api/v1/user/1
user.put(
  '/:id',
  [isAuthenticated, checkRole('updateAny', RBAC_GRANT_USER)],
  (_, res): void => {
    res.status(SUCCESS_STATUS).send();
  },
);

// Deleting a user
// /api/v1/user/1
user.delete(
  '/:id',
  [isAuthenticated, checkRole('deleteAny', RBAC_GRANT_USER)],
  (_, res): void => {
    res.status(SUCCESS_STATUS).send();
  },
);
