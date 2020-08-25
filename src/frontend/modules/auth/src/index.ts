import {lazy} from 'react';
import {logger} from '@the_platform/core';
import * as routes from './constants/routes';
import {name as module} from '../package.json';

const LoginPage = lazy(
  () => import(/* webpackChunkName: "pages/auth_login" */ './pages/login'),
);

const LogoutPage = lazy(
  () => import(/* webpackChunkName: "pages/auth_logout" */ './pages/logout'),
);

const LoginCertificatePage = lazy(
  () =>
    import(
      /* webpackChunkName: "pages/auth_login_certificate" */ './pages/login-certificate'
    ),
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
    module,
  },
  {
    path: routes.ROUTE_AUTH_LOGOUT,
    Page: LogoutPage,
    isPrivate: true,
    module,
  },
  {
    path: routes.ROUTE_AUTH_LOGIN_CERTIFICATE,
    Page: LoginCertificatePage,
    module,
  },
  {
    path: routes.ROUTE_AUTH_RECOVERY_PASSWORD,
    Page: RecoveryPasswordPage,
    isPrivate: true,
    module,
  },
  {
    path: routes.ROUTE_AUTH_UPDATE_PASSWORD,
    Page: UpdatePasswordPage,
    isPrivate: true,
    module,
  },
];

export const bootstrap = (): void => {
  logger.info('PLT.AUTH: Importing AUTH module.');
};

export {reducer} from './reducer';
