import {Router} from 'express';
import {createJwtToken} from '@the_platform/nodejs-core';
import {
  SUCCESS_STATUS,
  UNAUTHORIZED_STATUS,
  JWT_COOKIE_NAME,
  DEFAULT_USERNAME,
  DEFAULT_FULLNAME,
  DEFAULT_PASSWORD,
  COOKIE_OPTS
} from '../../constants';

export const auth = Router();

// /api/v1/auth/signin
auth.post('/signin', (req, res): void => {
  const {body} = req;

  if (body?.email === DEFAULT_USERNAME && body?.password === DEFAULT_PASSWORD) {
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

// /api/v1/auth/signout
auth.get('/signout', (req, res): void => {
  const {cookies} = req;

  if (cookies[JWT_COOKIE_NAME]) {
    res.clearCookie(JWT_COOKIE_NAME, {
      path: '/api',
    });
    res.status(SUCCESS_STATUS).send();
  } else {
    res.status(UNAUTHORIZED_STATUS).send();
  }
});
