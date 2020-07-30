import {sessionStorageInit, localStorageInit} from '@the_platform/core';
import {
  getFingerprint,
  customRequest,
  customRequestInit,
  CONST_URL,
} from '@the_platform/core';
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
      console.log('customRequest', customRequest);
      console.log('fp', fp);
      const a = customRequestInit({
        beforeRequest: [
          (req) => {
            req.headers.set('X-FP', fp);
          },
        ],
      });
      console.log('customRequest2', customRequest);
      console.log('customRequest3', a);
    })
    .catch(console.error);

  return Promise.resolve();
};
