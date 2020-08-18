// SERVER ---------------------------------------

export const SUCCESS_STATUS = 200;
export const UNAUTHORIZED_STATUS = 401;

// JWT ---------------------------------------

export const JWT_COOKIE_NAME = 'JWT_ID';
export const JWT_SECRET = 'secret';
export const JWT_EXPIRES = '24h';

// RBAC ---------------------------------------

export const RBAC_ROLE_GUEST = 'guest';
export const RBAC_ROLE_NON_CONFIRMED = 'new';
export const RBAC_ROLE_CONFIRMED = 'client';
export const RBAC_ROLE_ADMIN = 'admin';

export const RBAC_GRANT_USER = 'user';
export const RBAC_GRANT_USERS = 'users';

// LOGIN ---------------------------------------

export const DEFAULT_ID = '12345';
export const DEFAULT_USERNAME = 'a@a.a';
export const DEFAULT_PASSWORD = '12345';
export const DEFAULT_ROLE = RBAC_ROLE_ADMIN;
export const DEFAULT_FULLNAME = 'John Doe';

// COOKIE ---------------------------------------

export const COOKIE_EXPIRES_IN = 800000000;
export const COOKIE_OPTS = {
  maxAge: COOKIE_EXPIRES_IN,
  path: '/api',
  httpOnly: true,
};
