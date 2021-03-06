/*
 * Usage:
 *
 * Prevent changing any values or keys in object.
 *
 * import {deepFreeze} from '@the_platform/core';
 *
 * const foo = {'bar': 'baz'};
 *
 * deepFreeze(foo);
 *
 * foo.bar = 'foo';
 * console.log(foo.bar); // 'baz'
 *
 * foo.baz = 'foo';
 * console.log(foo.baz); // undefined
 */

/* eslint @typescript-eslint/no-unsafe-call: 0,
  @typescript-eslint/ban-ts-comment: 0, no-prototype-builtins: 0 */
// @ts-nocheck

export const deepFreeze = <T>(obj: T): T => {
  Object.freeze(obj);
  Object.getOwnPropertyNames(obj).forEach((prop) => {
    // eslint-disable-next-line no-prototype-builtins
    if (
      obj.hasOwnProperty(prop) &&
      obj[prop] !== null &&
      (typeof obj[prop] === 'object' || typeof obj[prop] === 'function') &&
      !Object.isFrozen(obj[prop])
    ) {
      deepFreeze(obj[prop]);
    }
  });

  return obj;
};
