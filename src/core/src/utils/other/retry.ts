/*
 * Usage:
 *
 * It will try to re-run function if the last one is getting error,
 * in most cases this is suitable for dynamic import.
 *
 * import {retry} from '@the_platform/core';
 *
 * const dynamicImport = () => retry(() => import('./something'));
 *
 * // ...
 * React.lazy(dynamicImport);
 * // ...
 */

const numberOfRetries = 5;

export const retry = (
  fn: () => Promise<void>,
  retriesLeft: number = numberOfRetries,
  interval: number = 1000,
): Promise<unknown> =>
  new Promise((resolve, reject) => {
    fn()
      .then(resolve)
      .catch((error) => {
        setTimeout(() => {
          if (retriesLeft === 0) {
            reject(error);
          } else {
            // eslint-disable-next-line promise/no-nesting
            retry(fn, retriesLeft - 1, interval)
              .then(resolve)
              .catch(reject);
          }
        }, interval);
      });
  });
