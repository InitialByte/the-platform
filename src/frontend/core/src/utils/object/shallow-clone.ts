// Based on @link https://github.com/jonschlinkert/shallow-clone
/* eslint-disable */
// @ts-nocheck
import {kindOf} from '../core';

type TTypedArray =
  | Int8Array
  | Int16Array
  | Int32Array
  | Uint8Array
  | Uint16Array
  | Uint32Array
  | Float32Array
  | Float64Array;

const {valueOf} = Symbol.prototype;

const cloneRegExp = (target: RegExp): RegExp => {
  const flags =
    target.flags !== undefined
      ? target.flags
      : /\w+$/.exec(target) || undefined;
  const result = new target.constructor(target.source, flags);

  result.lastIndex = target.lastIndex;

  return result;
};

const cloneArrayBuffer = (target: ArrayBuffer): ArrayBuffer => {
  const result = new target.constructor(target.byteLength);
  new Uint8Array(result).set(new Uint8Array(target));

  return result;
};

const cloneTypedArray = (target: TTypedArray): TTypedArray =>
  new target.constructor(target.buffer, target.byteOffset, target.length);

const cloneBuffer = (target: Buffer): Buffer => {
  const targetLength = target.length;
  const buffer = Buffer.allocUnsafe
    ? Buffer.allocUnsafe(targetLength)
    : Buffer.from(targetLength);

  target.copy(buffer);

  return buffer;
};

const cloneSymbol = (target: symbol): object =>
  valueOf ? Object(valueOf.call(target)) : {};

export const shallowClone = (target: any): unknown => {
  switch (kindOf(target)) {
    case 'array':
      return target.slice();
    case 'object':
      return {...target};
    case 'date':
      return new target.constructor(Number(target));
    case 'map':
      return new Map(target);
    case 'set':
      return new Set(target);
    case 'buffer':
      return cloneBuffer(target);
    case 'symbol':
      return cloneSymbol(target);
    case 'arraybuffer':
      return cloneArrayBuffer(target);
    case 'float32array':
    case 'float64array':
    case 'int16array':
    case 'int32array':
    case 'int8array':
    case 'uint16array':
    case 'uint32array':
    case 'uint8clampedarray':
    case 'uint8array':
      return cloneTypedArray(target);
    case 'regexp':
      return cloneRegExp(target);
    case 'error':
      return Object.create(target);
    default:
      return target;
  }
};
