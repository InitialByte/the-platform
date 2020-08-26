import {Router, Response, Request} from 'express';
import {addJwtCookie, clearJwtCookie, isAuthenticated} from '../../core';
import {
  SUCCESS_STATUS,
  UNAUTHORIZED_STATUS,
  DEFAULT_USERNAME,
  DEFAULT_PASSWORD,
  DEFAULT_FULLNAME,
} from '../../constants';

export const auth = Router();

// /api/v1/auth/signin
auth.post('/signin', (req: Request, res: Response): void => {
  const {body} = req;

  if (body?.email === DEFAULT_USERNAME && body?.password === DEFAULT_PASSWORD) {
    addJwtCookie(res.cookie.bind(res));
    res.status(SUCCESS_STATUS).json({
      data: {
        fullName: DEFAULT_FULLNAME,
      },
    });
  } else {
    res.status(UNAUTHORIZED_STATUS).json({
      error: {
        code: 1001,
        message: 'Incorrect email or password',
      },
    });
  }
});

// /api/v1/auth/signout
auth.get('/signout', isAuthenticated, (_, res: Response): void => {
  clearJwtCookie(res.clearCookie.bind(res));
  res.status(SUCCESS_STATUS).send();
});
