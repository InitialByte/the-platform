/*
 * Usage:
 *
 * import {groupBy} from '@the_platform/core';
 *
 * const foo = [{bar: 1, group: 2}, {bar: 3, group: 2}, {bar: 5, group: 3}];
 * const baz = groupBy(foo, 'group');
 *
 * // result baz:
 * // [
 * //   2 => [{bar: 1, group: 2}, {bar: 3, group: 2}],
 * //   3 => [{bar: 5, group: 3}],
 * // ]
 */

export const groupBy = (array: Array<any>, key: string): Array<any> =>
  array.reduce((result, currentValue) => {
    (result[currentValue[key]] = result[currentValue[key]] || []).push(
      currentValue,
    );
    return result;
  }, {});
