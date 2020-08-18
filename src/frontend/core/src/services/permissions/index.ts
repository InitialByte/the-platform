// @see https://developers.google.com/web/fundamentals/push-notifications/subscribing-a-user#requesting_permission

/*
 * Usage:
 *
 * import {requestPermission} from '@the_platform/core';
 *
 * requestPermission(['', ''])
 *   .then()
 *   .catch();
 */

export const requestPermission = (): Promise<any> =>
  new Promise((resolve, reject) => {
    const permissionResult = Notification.requestPermission(resolve);

    if (permissionResult) {
      permissionResult.then(resolve, reject);
    }
  })
    .then((permissionResult) => {
      if (permissionResult !== 'granted') {
        throw new Error('We weren\'t granted permission.');
      }
    });
