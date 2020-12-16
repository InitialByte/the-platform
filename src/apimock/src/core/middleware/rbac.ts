/* eslint-disable */
import {Response, Request, NextFunction} from 'express';
import {decodeJwtToken} from '../service';
import {JWT_COOKIE_NAME} from '../../constants';

type TActions =
  | 'updateOwn'
  | 'updateAny'
  | 'createOwn'
  | 'createAny'
  | 'readOwn'
  | 'readAny'
  | 'deleteOwn'
  | 'deleteAny';

export const checkRole = (action: TActions, grant: string) => (
  req: Request,
  res: Response,
  next: NextFunction,
): void => {
  console.log(`Rbac middleware: ${grant}`);
  const decodedJwt = decodeJwtToken(req.cookies[JWT_COOKIE_NAME] || '');

  console.log('decodedJwt', decodedJwt);

  return next();
  /* if (global.ac.can('test')[action](grant).granted) {
    return next();
  }

  res.status(UNAUTHORIZED_STATUS).json({
    error: {
      code: 1003,
      message: 'You is authorized for this action',
    },
  }); */
};
