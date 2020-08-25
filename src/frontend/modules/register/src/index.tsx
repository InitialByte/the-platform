import {lazy} from 'react';
import * as routes from './constants/routes';
import {shortName} from '../package.json';

const RegisterPage = lazy(
  () =>
    import(/* webpackChunkName: "pages/register_create" */ './pages/create'),
);

export const router: Platform.IRoute[] = [
  {
    path: routes.ROUTE_REGISTER_CREATE,
    Page: RegisterPage,
    shortName,
  },
];
