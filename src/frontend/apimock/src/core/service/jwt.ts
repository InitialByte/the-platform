import {sign, verify, decode} from 'jsonwebtoken';
import * as faker from 'faker';

import {
  JWT_SECRET,
  JWT_EXPIRES,
  JWT_COOKIE_NAME,
  DEFAULT_ID,
  DEFAULT_ROLE,
  COOKIE_OPTS,
} from '../../constants';

export const createJwtToken = (
  data: string | Record<string | number | symbol, unknown> | Buffer,
): any => sign({data}, JWT_SECRET, {expiresIn: JWT_EXPIRES});

export const verifyJwtToken = (token: string = ''): string | object =>
  verify(token, JWT_SECRET);

export const decodeJwtToken = (token: string = ''): any => decode(token);

export const addJwtCookie = (cookie: any): void => {
  cookie(
    JWT_COOKIE_NAME,
    createJwtToken({
      user_id: DEFAULT_ID,
      session_id: faker.random.uuid(),
      role: DEFAULT_ROLE,
    }),
    COOKIE_OPTS,
  );
};

export const clearJwtCookie = (clearCookie: any): any => {
  clearCookie(JWT_COOKIE_NAME, {
    path: '/api',
  });
};
