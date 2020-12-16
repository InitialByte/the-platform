/*
 * Usage:
 *
 * import {pick} from '@the_platform/core';
 *
 * const foo = {foo: 'foo', bar: 'bar', baz: 'baz'};
 * const bar = pick('foo', 'baz')(foo);
 */

/* eslint-disable */
// @ts-nocheck

export const pick = (...params) => (target: object | []): object | [] =>
  params.reduce((a, e) => ({...a, [e]: target[e]}), {});
