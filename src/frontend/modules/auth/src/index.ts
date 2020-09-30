import {lazy} from 'react';
import {logger, customRequest, CONST_URL} from '@the_platform/core';
import {Icon} from '@the_platform/react-uikit';
import * as routes from './constants/routes';
import {shortName} from '../package.json';
import {actions} from './reducer';

const LoginPage = lazy(
  () => import(/* webpackChunkName: "pages/auth_login" */ './pages/login'),
);

const LogoutPage = lazy(
  () => import(/* webpackChunkName: "pages/auth_logout" */ './pages/logout'),
);

const RegisterPage = lazy(
  () =>
    import(/* webpackChunkName: "pages/auth_register" */ './pages/register'),
);

const RecoveryPasswordPage = lazy(
  () =>
    import(
      /* webpackChunkName: "pages/auth_recovery_password" */ './pages/recovery-password'
    ),
);

const UpdatePasswordPage = lazy(
  () =>
    import(
      /* webpackChunkName: "pages/auth_update_password" */ './pages/update-password'
    ),
);

export const router: Platform.IRoute[] = [
  {
    path: routes.ROUTE_AUTH_LOGIN,
    Page: LoginPage,
    layout: 'Auth',
    title: 'Sign In',
    onlyForNotAuth: true,
    Icon: Icon.LockOutlined,
    shortName,
  },
  {
    path: routes.ROUTE_AUTH_LOGOUT,
    Page: LogoutPage,
    isPrivate: true,
    shortName,
  },
  {
    path: routes.ROUTE_AUTH_CREATE_ACCOUNT,
    Page: RegisterPage,
    onlyForNotAuth: true,
    layout: 'Auth',
    title: 'Create Account',
    Icon: Icon.AssignmentInd,
    shortName,
  },
  {
    path: routes.ROUTE_AUTH_RECOVERY_PASSWORD,
    Page: RecoveryPasswordPage,
    onlyForNotAuth: true,
    layout: 'Auth',
    title: 'Recovery Password',
    Icon: Icon.ThreeSixty,
    shortName,
  },
  {
    path: routes.ROUTE_AUTH_UPDATE_PASSWORD,
    Page: UpdatePasswordPage,
    isPrivate: true,
    title: 'Update Password',
    Icon: Icon.Update,
    shortName,
  },
];

export const bootstrap = (store: Record<string, unknown>): void => {
  logger.info('PLT.AUTH: Importing AUTH module.');

  customRequest
    .get(CONST_URL.URL_TOKEN_CHECK)
    .then(
      (result: unknown): Promise<unknown> => {
        console.log('result', result);
        // TODO: add fullName from result
        // eslint-disable-next-line @typescript-eslint/no-unsafe-return
        return store.dispatch(actions.simpleAuth({fullName: 'test'}));
      },
    )
    .catch(console.error);
};

export {reducer} from './reducer';
