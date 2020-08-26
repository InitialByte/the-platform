import {Response, Request, NextFunction} from 'express';
import {verifyJwtToken} from '../service';
import {UNAUTHORIZED_STATUS, JWT_COOKIE_NAME} from '../../constants';

export const isAuthenticated = (
  req: Request,
  res: Response,
  next: NextFunction,
): void => {
  console.log('Auth middleware');

  let isValid = false;

  try {
    isValid = !!verifyJwtToken(req.cookies[JWT_COOKIE_NAME]);
  } catch {}

  if (isValid) {
    return next();
  }

  res.status(UNAUTHORIZED_STATUS).json({
    error: {
      code: 1002,
      message: 'You is authenticated',
    },
  });
};
