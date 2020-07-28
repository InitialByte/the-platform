/*
 * Usage:
 *
 * import {generateUUIDv4} from '@the_platform/core';
 *
 * const uuid = generateUUIDv4();
 */

/* eslint-disable no-bitwise, @typescript-eslint/no-magic-numbers */

export const generateUUIDv4 = (toReplace: string = ''): string =>
  (toReplace
    ? (
      (Number(toReplace) ^ (Math.random() * 16))
        >> (Number(toReplace) / 4)
    ).toString(16)
    : `${1e7}-${1e3}-${4e3}-${8e3}-${1e11}`.replace(/[018]/g, generateUUIDv4));
