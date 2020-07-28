/*
 * Usage:
 *
 * import {parseJson, stringifyJson} from '@the_platform/core';
 *
 * try {
 *   const data = parseJson('foo');
 * } catch (e) {
 *   // do something with error
 * }
 *
 * try {
 *   const data = stringifyJson('foo');
 * } catch (e) {
 *   // do something with error
 * }
 */

export const parseJson = <T>(
  jsonData: string,
  reviver?: (this: unknown, key: string, value: unknown) => T,
): T => {
  try {
    return JSON.parse(jsonData, reviver);
  } catch (e) {
    throw Error(e);
  }
};

export const stringifyJson = (
  data: object,
  replacer?: (this: unknown, key: string, value: unknown) => unknown,
  space?: string | number,
): string => {
  try {
    return JSON.stringify(data, replacer, space);
  } catch (e) {
    throw new Error(e);
  }
};
