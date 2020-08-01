import {sessionStorageInit, localStorageInit} from '@the_platform/core';
import {getFingerprint, customRequestInit} from '@the_platform/core';
import {
  paintMeasure,
  browserMeasure,
  resourcesMeasure,
} from '@the_platform/core';

const storagePrefix = 'APP_';

// Can be accessed across the whole application.
/* const session = */ sessionStorageInit(storagePrefix);
/* const local = */ localStorageInit(storagePrefix);

window.onload = () => {
  setTimeout(() => {
    console.log(paintMeasure());
    console.log(browserMeasure());
    console.log(resourcesMeasure());
  }, 1000);
};

export const bootstrapApp = async (): Promise<string> => {
  getFingerprint()
    .then((fp) => {
      customRequestInit({
        beforeRequest: [
          (req) => {
            req.headers.set('X-FP', fp);
          },
        ],
      });
    })
    .catch(console.error);

  return Promise.resolve();
};
