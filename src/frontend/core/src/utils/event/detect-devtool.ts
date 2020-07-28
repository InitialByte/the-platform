/*
 * Usage:
 *
 * import {detectDevToolOpening} from './utils';
 *
 * detectDevToolOpening(() => {
 *  alert('DevTool was opened.');
 * });
 */

export const detectDevToolOpening = (onOpen: () => void): void => {
  const devToolDetection = (): void => {};

  devToolDetection.toString = (): void => {
    onOpen();
  };

  console.log('%c', devToolDetection);
};
