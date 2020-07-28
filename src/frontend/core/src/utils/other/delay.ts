/*
 * Usage:
 *
 * It will try to re-run function if the last one is getting error,
 * in most cases this is suitable for dynamic import.
 *
 * import {delay} from '@the_platform/core';
 *
 * const a = () => alert('Foo');
 * delay(a, 1000); // Call a fn after 1000ms
 *
 * const b = (a, b) => alert('Foo', a, b);
 * delay(a, 1000); // Call a fn after 1000ms
 */

export const delay = (fn: () => void, ms: number): any => new Proxy(fn, {
  apply(target, thisArg, args) {
    setTimeout(() => target.apply(thisArg, args), ms);
  },
});
