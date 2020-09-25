import {lazy} from 'react';
import * as routes from './routes';
import {shortName} from '../../package.json';

const HomePage = lazy(
  () => import(/* webpackChunkName: "pages/webapp_home" */ '../pages/home'),
);

const NotFoundPage = lazy(
  () =>
    import(/* webpackChunkName: "pages/webapp_notfound" */ '../pages/notfound'),
);

export const router: Platform.IRoute[] = [
  {
    path: routes.ROUTE_HOME,
    Page: HomePage,
    exact: true,
    isPrivate: true,
    shortName,
  },
  {
    path: routes.ROUTE_NOT_FOUND,
    Page: NotFoundPage,
    exact: true,
    shortName,
  },
];
