/*
 * Usage:
 *
 * This is good place to send some analytics data etc. before user closed the page.
 *
 * import {onUnload} from '@the_platform/core';
 *
 * onUnload('/api/v1/analytics', {
 *   userId: 1,
 *   clicks: 1000,
 *   viewedPages: ['/users', '/users/10']
 * });
 *
 * To prevent close page, e.g. if user have some unsaved data you can do this thing
 *
 * import {preventUnload} from '@the_platform/core';
 *
 * preventUnload();
 */

export const onUnload = (
  apiUrl: string,
  data?: Record<string, unknown> | string,
): void => {
  window.addEventListener('unload', () => {
    // @link https://w3c.github.io/beacon/
    if (navigator.sendBeacon) {
      navigator.sendBeacon(apiUrl, JSON.stringify(data));
    }
  });
};

export const preventUnload = (
  textPreventClose: string | false = false,
): void => {
  window.onbeforeunload = () =>
    // Text may not work in new browsers. It will show only an default message like:
    // "Changes you made may not be saved."
    textPreventClose;
};
