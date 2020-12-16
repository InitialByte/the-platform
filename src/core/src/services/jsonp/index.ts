/*
 * Usage:
 *
 * import {jsonp} from '@the_platform/core';
 *
 * jsonp('http://someapi.api/')
 *   .then((response) => {...})
 *   .catch((error) => {...});
 *
 * // By default it has timeout = 20s, after that timeout
 * // script will reject request with error if no success response.
 * jsonp('http://someapi.api/', 0)
 *   .then((response) => {...})
 *   .catch((error) => {...});
 */

type TCallback = (data: unknown) => void;

// eslint-disable-next-line @typescript-eslint/no-unused-vars
declare global {
  interface Window {
    jsonpRegistry: Record<string, TCallback>;
  }
}

const {jsonpRegistry = {}} = window;
const responseTimeout = 20000;

export function jsonp(
  url: string,
  timeout: number = responseTimeout,
): Promise<unknown> {
  return new Promise((resolve, reject) => {
    const sliceRandom = 10;
    const callbackName: string = `jsonp_${String(Math.random()).slice(
      sliceRandom,
    )}`;
    let uri = `${url}${url.includes('?') ? '&' : '?'}`;
    uri += `callback=jsonpRegistry.${callbackName}`;
    let timeoutId: number;
    const onResult = (): void => {
      delete jsonpRegistry[callbackName];
      const script = document.getElementById(callbackName);

      if (script) {
        document.body.removeChild(script);
      }
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
    const script = document.createElement('script');

    jsonpRegistry[callbackName] = (data: unknown): void => {
      onResult();
      resolve(data);
    };

    script.onerror = (): void => {
      onResult();
      reject(new Error(`JSONP request to ${uri} failed.`));
    };

    script.src = uri;
    script.async = true;
    script.id = callbackName;

    if (timeout > 0) {
      timeoutId = window.setTimeout((): void => {
        onResult();
        reject(new Error(`JSONP request to ${uri} timed out.`));
      }, timeout);
    }

    document.body.appendChild(script);
  });
}
