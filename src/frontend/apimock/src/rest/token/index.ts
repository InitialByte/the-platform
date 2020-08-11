import {Router} from 'express';
import {verifyJwtToken, addJwtCookie, isAuthenticated} from '../../core';
import {
  SUCCESS_STATUS,
  UNAUTHORIZED_STATUS,
  JWT_COOKIE_NAME,
} from '../../constants';

export const token = Router();

// /api/v1/token/check
token.get('/check', (req, res): void => {
  let isValid = false;

  try {
    isValid = !!verifyJwtToken(req.cookies[JWT_COOKIE_NAME]);
  } catch {}

  if (isValid) {
    res.status(SUCCESS_STATUS).send();
  } else {
    res.status(UNAUTHORIZED_STATUS).send();
  }
});

// /api/v1/token/refresh
token.get('/refresh', isAuthenticated, (_, res): void => {
  addJwtCookie(res.cookie);
  res.status(SUCCESS_STATUS).send();
});
