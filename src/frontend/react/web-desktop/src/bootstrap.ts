import {
  sessionStorageInit,
  customRequestInit,
  resourcesMeasure,
  localStorageInit,
  getFingerprint,
  browserMeasure,
  paintMeasure,
  initI18n,
  i18next,
} from '@the_platform/core';

window.onload = (): void => {
  setTimeout((): void => {
    console.log(paintMeasure());
    console.log(browserMeasure());
    console.log(resourcesMeasure());
  }, 1000);
};

export const bootstrapApp = async (): Promise<void> => {
  const storagePrefix = 'PLT_';

  initI18n().then(() => i18next.changeLanguage('en_us'));

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
    .catch(console.error);

  return Promise.resolve();
};
