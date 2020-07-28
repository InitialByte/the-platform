/*
 * Usage:
 *
 * It can be used as a stub for objects which was not instantiated yet.
 * This scripts is using JSs Proxy pattern to intercept any access
 * to any field or method in the object. It throws only error message.
 *
 * import {proxyErrorHandler} from './utils';
 *
 * let session = proxyErrorHandler('Session');
 *
 * session.getItem('foo'); // throw error "Session was not instantiated."
 * session.setItem('foo', 'bar'); // throw error "Session was not instantiated."
 * session.foo; // throw error "Session was not instantiated."
 *
 * session = window.sessionStorage;
 *
 * session.getItem('foo'); // ok
 */

interface IErrorHandler {
  get(): never;
}

const errorHandler = (type: string): IErrorHandler => ({
  get: () => {
    throw new Error(`${type} was not instantiated.`);
  },
});

export const proxyErrorHandler = (type: string): Record<string, unknown> =>
  new Proxy({}, errorHandler(type));
