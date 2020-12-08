import {lazy} from 'react';
import {logger, customRequest, CONST_URL} from '@the_platform/core';
import {Icon} from '@the_platform/react-uikit';
import * as routes from './constants/routes';
import {actions} from './reducer';
import * as packageImport from '../package.json';

const {shortName} = packageImport;
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
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    Page: LoginPage,
    layout: 'Auth',
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
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    Page: RegisterPage,
    onlyForNotAuth: true,
    layout: 'Auth',
    Icon: Icon.AssignmentInd,
    shortName,
  },
  {
    path: routes.ROUTE_AUTH_RECOVERY_PASSWORD,
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    Page: RecoveryPasswordPage,
    onlyForNotAuth: true,
    layout: 'Auth',
    Icon: Icon.ThreeSixty,
    shortName,
  },
  {
    path: routes.ROUTE_AUTH_UPDATE_PASSWORD,
    Page: UpdatePasswordPage,
    isPrivate: true,
    Icon: Icon.Update,
    shortName,
  },
];

export const bootstrap = (store: Record<string, unknown>): void => {
  logger.info('PLT.AUTH: Importing AUTH module.');

  customRequest
    .get(CONST_URL.URL_TOKEN_CHECK, {
      throwHttpErrors: false,
    })
    .then(
      async (result: unknown): Promise<unknown> => {
        const SUCCESS_STATUS_200 = 200;
        let data = {};

        /* eslint-disable */
        try {
          const response = await result.json();
          data = response.data;
        } catch (e) {
          logger.error(E_CODE.E_104, e);
        }

        // eslint-disable-next-line @typescript-eslint/no-unsafe-return
        return store &&
          store.dispatch &&
          typeof store.dispatch === 'function' &&
          result?.status === SUCCESS_STATUS_200
          ? store.dispatch(actions.simpleAuth({fullName: data.fullName}))
          : Promise.resolve();
        /* eslint-enable */
      },
    )
    .catch((error: string) => logger.error(E_CODE.E_104, error));
};

export {reducer} from './reducer';
