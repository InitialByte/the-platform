/* eslint-disable */
// @ts-nocheck

import {kindOf, isPlainObject} from '../core';
import {shallowClone} from './shallow-clone';

const cloneObject = (target: object) => {
  if (isPlainObject(target)) {
    const result =
      target.constructor && kindOf(target.constructor) === 'function'
        ? new target.constructor()
        : Object.create(null);

    for (const key in target) {
      result[key] = deepClone(target[key]);
    }

    return result;
  }

  return target;
};

const cloneArray = (target: []): unknown[] =>
  new Array(target.length)
    .fill(null)
    .map((_, index) => deepClone(target[index]));

export const deepClone = (target: unknown): unknown => {
  switch (kindOf(target)) {
    case 'object':
      return cloneObject(target);
    case 'array':
      return cloneArray(target);
    default:
      return shallowClone(target);
  }
};
