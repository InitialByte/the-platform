import './global';

import {render} from 'react-dom';
import {Provider} from 'react-redux';
import {loggerInit} from '@the_platform/core';
import {AppRouter} from './routes';
import {bootstrapApp} from './bootstrap';
import {moduleRoutes, store} from './store';

interface IConfig {
  version: string;
}

/* eslint-disable */
const packageImport = require('../../../../package.json');
const {version = '1'}: IConfig = packageImport;
/* eslint-disable */

const logger = loggerInit();
const MOUNT_POINT: HTMLElement | null = document.getElementById('app');
// eslint-disable-next-line no-underscore-dangle
const isProduction = window?.__INITIAL_STATE__?.env?.mode === 'production';

if ('serviceWorker' in navigator && isProduction) {
  window.addEventListener('load', (): void => {
    navigator.serviceWorker
      .register(`/sw.js?v=${version.toString().replaceAll('.', '')}`)
      .then(() => console.log('ServiceWorker registration successfully.'))
      .catch((error: string) => logger.error(E_CODE.E_103, error));
  });
}

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
