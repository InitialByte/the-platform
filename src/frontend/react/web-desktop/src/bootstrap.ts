import {sessionStorageInit, localStorageInit} from '@the_platform/core';
import {getFingerprint} from '@the_platform/core';
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
  // getFingerprint()
  //  .then(console.log)
  //  .catch(console.error);
  return Promise.resolve();
};
