import {Router} from 'express';
import * as faker from 'faker';

export const user = Router();
const SUCCESS_STATUS = 200;

// List of users
// /api/v1/user
user.get('/', (_, res): void => {
  res.status(SUCCESS_STATUS).json({
    data: {
      id: faker.name.findName(),
      name: faker.name.findName(),
    },
  });
});

// Creating new user
// /api/v1/user
user.post('/', (_, res): void => {
  res.status(SUCCESS_STATUS).send();
});

// Updating a user
// /api/v1/user/1
user.put('/:id', (_, res): void => {
  res.status(SUCCESS_STATUS).send();
});

// Deleting a user
// /api/v1/user/1
user.delete('/:id', (_, res): void => {
  res.status(SUCCESS_STATUS).send();
});
