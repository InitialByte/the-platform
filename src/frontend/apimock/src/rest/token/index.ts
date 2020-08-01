import {Router} from 'express';
import {createJwtToken} from '@the_platform/nodejs-core';
import {
  SUCCESS_STATUS,
  UNAUTHORIZED_STATUS,
  JWT_COOKIE_NAME,
  DEFAULT_USERNAME,
  DEFAULT_FULLNAME,
  COOKIE_OPTS,
} from '../../constants';

export const token = Router();

// /api/v1/token/check
token.post('/check', (req, res): void => {
  const {cookies} = req;

  if (true) {
    res.status(SUCCESS_STATUS).send();
  } else {
    res.status(UNAUTHORIZED_STATUS).send();
  }
});

// /api/v1/token/refresh
token.get('/refresh', (req, res): void => {
  const {cookies} = req;

  if (cookies[JWT_COOKIE_NAME]) {
    res.cookie(
      JWT_COOKIE_NAME,
      createJwtToken({
        email: DEFAULT_USERNAME,
        fullname: DEFAULT_FULLNAME,
      }),
      COOKIE_OPTS,
    );
    res.status(SUCCESS_STATUS).send();
  } else {
    res.status(UNAUTHORIZED_STATUS).send();
  }
});
