import {lazy} from 'react';
import * as routes from './constants/routes';

const LoginPage = lazy(() =>
  import(/* webpackChunkName: "pages/auth_login" */ './pages/login'));

const LogoutPage = lazy(() =>
  import(/* webpackChunkName: "pages/auth_logout" */ './pages/logout'));

const LoginCertificatePage = lazy(() =>
  import(/* webpackChunkName: "pages/auth_login_certificate" */ './pages/login-certificate'));

const RecoveryPasswordPage = lazy(() =>
  import(/* webpackChunkName: "pages/auth_recovery_password" */ './pages/recovery-password'));

const UpdatePasswordPage = lazy(() =>
  import(/* webpackChunkName: "pages/auth_update_password" */ './pages/update-password'));

export const router: Platform.IRoute[] = [
  {
    path: routes.ROUTE_AUTH_LOGIN,
    Page: LoginPage,
  },
  {
    path: routes.ROUTE_AUTH_LOGOUT,
    Page: LogoutPage,
  },
  {
    path: routes.ROUTE_AUTH_LOGIN_CERTIFICATE,
    Page: LoginCertificatePage,
  },
  {
    path: routes.ROUTE_AUTH_RECOVERY_PASSWORD,
    Page: RecoveryPasswordPage,
  },
  {
    path: routes.ROUTE_AUTH_UPDATE_PASSWORD,
    Page: UpdatePasswordPage,
  },
];
