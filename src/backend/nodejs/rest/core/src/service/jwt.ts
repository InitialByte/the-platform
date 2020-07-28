import {sign} from 'jsonwebtoken';

const {
  JWT_SECRET = '(S*Aj3489YSS2342IU$#SD',
  JWT_EXPIRES = '1h',
} = process.env;

export const createJwtToken = (data = {}): any =>
  sign({data}, JWT_SECRET, {expiresIn: JWT_EXPIRES});
