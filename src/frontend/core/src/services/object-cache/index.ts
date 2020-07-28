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

const globals: Map<string, unknown> = new Map();

export const hasObjectCache = (key: string): boolean => globals.has(key);
export const setObjectCache = (key: string, value: unknown): boolean =>
  (globals.has(key) ? Boolean(globals.set(key, deepFreeze(value))) : false);
export const getObjectCache = (key: string): unknown => globals.get(key);
export const removeObjectCache = (key: string): boolean => globals.delete(key);
export const clearObjectCache = (): void => globals.clear();
