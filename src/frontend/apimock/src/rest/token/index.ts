import {Router, Response, Request} from 'express';
import {verifyJwtToken, addJwtCookie, isAuthenticated} from '../../core';
import {
  SUCCESS_STATUS,
  UNAUTHORIZED_STATUS,
  JWT_COOKIE_NAME,
} from '../../constants';

export const token = Router();

// /api/v1/token/check
token.get('/check', (req: Request, res: Response): void => {
  let isValid = false;

  try {
    isValid = !!verifyJwtToken(req.cookies[JWT_COOKIE_NAME]);
  } catch {}

  if (isValid) {
    res.status(SUCCESS_STATUS).send();
  } else {
    res.status(UNAUTHORIZED_STATUS).json({
      error: {
        code: 1000,
        message: 'Incorrect JWT token',
      },
    });
  }
});

// /api/v1/token/refresh
token.get('/refresh', isAuthenticated, (_, res: Response): void => {
  addJwtCookie(res.cookie);
  res.status(SUCCESS_STATUS).send();
});
