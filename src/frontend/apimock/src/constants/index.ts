export const SUCCESS_STATUS = 200;
export const UNAUTHORIZED_STATUS = 401;

export const JWT_COOKIE_NAME = 'JWT_ID';

export const DEFAULT_USERNAME = 'root@root.com';
export const DEFAULT_FULLNAME = 'John Doe';
export const DEFAULT_PASSWORD = '12345';

export const COOKIE_EXPIRES_IN = 800000000;
export const COOKIE_OPTS = {
  maxAge: COOKIE_EXPIRES_IN,
  path: '/api',
  httpOnly: true,
};
