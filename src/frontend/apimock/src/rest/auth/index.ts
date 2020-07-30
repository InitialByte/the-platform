import {Router} from 'express';

export const auth = Router();

const SUCCESS_STATUS = 200;
const UNAUTHORIZED_STATUS = 401;
const JWT_COOKIE_NAME = 'JWT_ID';
const DEFAULT_USERNAME = 'root@root.com';
const DEFAULT_PASSWORD = '12345';
const COOKIE_EXPIRES = 800000000;
const COOKIE_DEV_NAME = 'dev';
const COOKIE_REFRESHED_NAME = 'dev-refresh';
const COOKIE_OPTS = {
  maxAge: COOKIE_EXPIRES,
  path: '/api',
  httpOnly: true,
};

// /api/v1/auth/signin
auth.post('/signin', (req, res): void => {
  const {body} = req;

  if (body?.email === DEFAULT_USERNAME && body?.password === DEFAULT_PASSWORD) {
    res.cookie(JWT_COOKIE_NAME, COOKIE_DEV_NAME, COOKIE_OPTS);
    res.status(SUCCESS_STATUS).send();
  } else {
    res.status(UNAUTHORIZED_STATUS).send();
  }
});

// /api/v1/auth/check
auth.post('/check', (req, res): void => {
  const {cookies} = req;

  if (
    cookies[JWT_COOKIE_NAME] &&
    (cookies[JWT_COOKIE_NAME] === COOKIE_DEV_NAME ||
      cookies[JWT_COOKIE_NAME] === COOKIE_REFRESHED_NAME)
  ) {
    res.status(SUCCESS_STATUS).send();
  } else {
    res.status(UNAUTHORIZED_STATUS).send();
  }
});

// /api/v1/auth/refreshtoken
auth.get('/refreshtoken', (req, res): void => {
  const {cookies} = req;

  if (cookies[JWT_COOKIE_NAME]) {
    res.cookie(JWT_COOKIE_NAME, COOKIE_REFRESHED_NAME, COOKIE_OPTS);
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
