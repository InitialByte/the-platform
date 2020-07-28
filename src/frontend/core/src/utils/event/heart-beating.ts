// TODO possible add ability check status via web-socket
// @link http://jmesnil.net/stomp-websocket/doc/#heartbeat

/*
 * Usage:
 *
 * import {heartBeating} from './utils';
 *
 * // It'll be called every time when online status is changing.
 * heartBeating((status) => {
 *   if (status === 'online') {
 *     // ...
 *   } else {
 *     // ...
 *   }
 * });
 */

const on = window.addEventListener;

export const heartBeating = (
  handleOnlineStatus: (status: 'online' | 'offline') => void,
): void => {
  on('load', () => {
    const updateOnlineStatus = (): void =>
      handleOnlineStatus(navigator.onLine ? 'online' : 'offline');

    on('online', updateOnlineStatus);
    on('offline', updateOnlineStatus);
  });
};
