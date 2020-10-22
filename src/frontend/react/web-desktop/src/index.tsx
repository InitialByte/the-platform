import './global';

import {render} from 'react-dom';
import {Provider} from 'react-redux';
import {loggerInit} from '@the_platform/core';
import {AppRouter} from './routes';
import {bootstrapApp} from './bootstrap';
import {moduleRoutes, store} from './store';

const logger = loggerInit();
const MOUNT_POINT: HTMLElement | null = document.getElementById('app');

if (!MOUNT_POINT) {
  logger.error(E_CODE.E_101);
} else {
  bootstrapApp()
    .then((): null => {
      render(
        <Provider store={store}>
          <AppRouter modulesRoute={moduleRoutes} />
        </Provider>,
        MOUNT_POINT,
      );

      return null;
    })
    .catch((error: string) => logger.error(E_CODE.E_100, error));
}
