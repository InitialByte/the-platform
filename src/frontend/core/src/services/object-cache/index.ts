/* Can be used to share global config or something like that
 * across the whole application.
 *
 * Usage:
 *
 * ./foo.ts
 * import {setObjectCache} from '@the_platform/core';
 *
 * setObjectCache('userData', {
 *   login: 'bar',
 *   logged: new Date.now(),
 * });
 *
 * ./bar.ts
 * import {getObjectCache} from '@the_platform/core';
 *
 * const userData = getObjectCache('userData');
 */

import {deepFreeze} from '../../utils/object/deep-freeze';

const globals = new Map();

export const hasObjectCache = (key: string): boolean => globals.has(key);
// eslint-disable-next-line no-confusing-arrow
export const setObjectCache = <T>(key: string, value: T): boolean =>
  globals.has(key) ? Boolean(globals.set(key, deepFreeze(value))) : false;
export const getObjectCache = <T>(key: string): T | undefined =>
  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  globals.get(key);
export const removeObjectCache = (key: string): boolean => globals.delete(key);
export const clearObjectCache = (): void => globals.clear();
