// @see https://developers.google.com/web/fundamentals/push-notifications/subscribing-a-user#requesting_permission

/*
 * Detect if user is inactive.
 * Use cases:
 * - Chat application: presenting a user's status to other users
 *   and delivering notifications to the device where the user is active.
 * - Showing timely notifications - e.g. deferring displaying feedback
 *   until the user returns to an active state.
 * - Updating an outdated service worker when there's no
 *   unsaved state by triggering reloading of the tab.
 *
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
