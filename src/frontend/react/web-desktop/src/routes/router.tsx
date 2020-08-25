import {lazy} from 'react';
import * as routes from './routes';
import {name as module} from '../../package.json';

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
    module,
  },
  {
    path: routes.ROUTE_NOT_FOUND,
    Page: NotFoundPage,
    exact: true,
    module,
  },
];
