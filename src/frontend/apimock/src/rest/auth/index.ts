import {Router} from 'express';

export const auth = Router();

const SUCCESS_STATUS = 200;
const UNAUTHORIZED_STATUS = 401;
const JWT_COOKIE_NAME = 'JWT_ID';
const DEFAULT_USERNAME = 'root';
const DEFAULT_PASSWORD = '1';

// /api/v1/auth/signin
auth.post('/signin', (req, res): void => {
  const {body} = req;

  if (
    body?.username === DEFAULT_USERNAME
    && body?.password === DEFAULT_PASSWORD
  ) {
    res.cookie(JWT_COOKIE_NAME, 'dev', {
      maxAge: 9000000,
      path: '/api',
      domain: 'localhost',
      httpOnly: true,
    });
    res.status(SUCCESS_STATUS).send();
  } else {
    res.status(UNAUTHORIZED_STATUS).send();
  }
});

// /api/v1/auth/refreshtoken
auth.get('/refreshtoken', (req, res): void => {
  const {cookies} = req;

  if (cookies[JWT_COOKIE_NAME]) {
    res.cookie(JWT_COOKIE_NAME, 'dev-refresh', {
      maxAge: 9000000,
      path: '/api',
      domain: 'localhost',
      httpOnly: true,
    });
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
      domain: 'localhost',
    });
    res.status(SUCCESS_STATUS).send();
  } else {
    res.status(UNAUTHORIZED_STATUS).send();
  }
});
