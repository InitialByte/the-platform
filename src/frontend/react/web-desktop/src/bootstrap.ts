/* eslint-disable */

import {
  sessionStorageInit,
  customRequestInit,
  resourcesMeasure,
  localStorageInit,
  getFingerprint,
  browserMeasure,
  paintMeasure,
  initI18n,
  logger,
} from '@the_platform/core';

interface IConfig {
  config: {
    app: {
      settings: {
        availableLanguages: string[];
        defaultLanguage: string;
      };
    };
  };
}

const {config}: IConfig = require('../../../../../package.json');

window.onload = (): void => {
  setTimeout((): void => {
    console.log(paintMeasure());
    console.log(browserMeasure());
    console.log(resourcesMeasure());
  }, 1000);
};

export const bootstrapApp = async (): Promise<void> => {
  const storagePrefix = 'PLT_';
  const {availableLanguages = [], defaultLanguage = 'en_us'} =
    config?.app?.settings ?? {};

  initI18n({
    fallbackLng: {
      'en-US': 'en_us',
      'ru-RU': 'ru_ru',
    },
    supportedLngs: availableLanguages ?? [defaultLanguage],
    lowerCaseLng: true,
  }).catch((e: Error) => logger.error(E_CODE.E_1, e));

  // Can be accessed across the whole application.
  sessionStorageInit(storagePrefix);
  localStorageInit(storagePrefix);

  getFingerprint()
    .then(
      (fp: string): ReturnType<typeof customRequestInit> =>
        customRequestInit({
          beforeRequest: [
            (req: Request): void => {
              req.headers.set('X-FP', fp);
            },
          ],
        }),
    )
    .catch((e: Error) => logger.error(E_CODE.E_1, e));

  return Promise.resolve();
};
