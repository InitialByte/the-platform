import './global';

import * as React from 'react';
import {render} from 'react-dom';
import {loggerInit} from '@the_platform/core';
import * as routes from '@the_platform/routes';
import {AppRouter} from './routes';
import {bootstrapApp} from './bootstrap';

const logger = loggerInit();
const MOUNT_POINT: HTMLElement | null = document.getElementById('app');

if (!MOUNT_POINT) {
  logger.error(E_CODE.E_101);
} else {
  bootstrapApp()
    .then((): null => {
      render(
        <AppRouter
          modulesRoute={Object.values(routes).flat() as Platform.IRoute[]}
        />,
        MOUNT_POINT,
      );

      return null;
    })
    .catch((error: string) => logger.error(E_CODE.E_100, error));
}
