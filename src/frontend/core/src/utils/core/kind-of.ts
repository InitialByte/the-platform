// based on @link https://github.com/jonschlinkert/kind-of
/* eslint-disable */
// @ts-nocheck

const hasArrayBuffer = typeof ArrayBuffer === 'function';
const ctorName = (value: any): string =>
  value.constructor ? value.constructor.name : null;
const isGeneratorFn = (name: any): boolean =>
  ctorName(name) === 'GeneratorFunction';
const isGeneratorObj = (value: any): boolean =>
  typeof value.throw === 'function' &&
  typeof value.return === 'function' &&
  typeof value.next === 'function';
const isArray = (value: any): boolean =>
  Array.isArray ? Array.isArray(value) : value instanceof Array;
const isError = (value: any): boolean =>
  value instanceof Error ||
  (typeof value.message === 'string' &&
    value.constructor &&
    typeof value.constructor.stackTraceLimit === 'number');

const isDate = (value: any): boolean => {
  if (value instanceof Date) {
    return true;
  }

  return (
    typeof value.toDateString === 'function' &&
    typeof value.getDate === 'function' &&
    typeof value.setDate === 'function'
  );
};

const isRegexp = (value: any): boolean => {
  if (value instanceof RegExp) {
    return true;
  }

  return (
    typeof value.flags === 'string' &&
    typeof value.ignoreCase === 'boolean' &&
    typeof value.multiline === 'boolean' &&
    typeof value.global === 'boolean'
  );
};

const isArguments = (value: any): boolean => {
  try {
    if (
      typeof value.length === 'number' &&
      typeof value.callee === 'function'
    ) {
      return true;
    }
  } catch (err) {
    if (err.message.indexOf('callee') !== -1) {
      return true;
    }
  }

  return false;
};

const isBuffer = (value: any): boolean =>
  value.constructor && typeof value.constructor.isBuffer === 'function'
    ? value.constructor.isBuffer(value)
    : false;

const isArrayBuffer = (value: any): boolean =>
  hasArrayBuffer &&
  (value instanceof ArrayBuffer ||
    Object.prototype.toString.call(value) === '[object ArrayBuffer]');

type TKindOf =
  | 'undefined'
  | 'null'
  | 'boolean'
  | 'string'
  | 'number'
  | 'symbol'
  | 'generatorfunction'
  | 'asyncfunction'
  | 'function'
  | 'array'
  | 'arraybuffer'
  | 'buffer'
  | 'arguments'
  | 'date'
  | 'error'
  | 'regexp'
  | 'symbol'
  | 'promise'
  | 'weakmap'
  | 'weakset'
  | 'map'
  | 'set'
  | 'int8array'
  | 'uint8array'
  | 'uint8clampedarray'
  | 'int16array'
  | 'uint16array'
  | 'int32array'
  | 'uint32array'
  | 'float32array'
  | 'float64array'
  | 'generator'
  | 'object'
  | 'mapiterator'
  | 'setiterator'
  | 'stringiterator'
  | 'arrayiterator';

// eslint-disable-next-line sonarjs/cognitive-complexity
export function kindOf(value: any): TKindOf {
  // eslint-disable-next-line no-void
  if (value === void 0) {
    return 'undefined';
  }

  if (value === null) {
    return 'null';
  }

  const type = typeof value;

  if (type === 'boolean') {
    return 'boolean';
  }

  if (type === 'string') {
    return 'string';
  }

  if (type === 'number') {
    return 'number';
  }

  if (type === 'symbol') {
    return 'symbol';
  }

  if (type === 'function') {
    if (isGeneratorFn(value)) {
      return 'generatorfunction';
    }

    return 'function';
  }

  if (isArray(value)) {
    return 'array';
  }

  if (isArrayBuffer(value)) {
    return 'arraybuffer';
  }

  if (isBuffer(value)) {
    return 'buffer';
  }

  if (isArguments(value)) {
    return 'arguments';
  }

  if (isDate(value)) {
    return 'date';
  }

  if (isError(value)) {
    return 'error';
  }

  if (isRegexp(value)) {
    return 'regexp';
  }

  // eslint-disable-next-line default-case
  switch (ctorName(value)) {
    case 'Symbol':
      return 'symbol';
    case 'Promise':
      return 'promise';

    // Set, Map, WeakSet, WeakMap
    case 'WeakMap':
      return 'weakmap';
    case 'WeakSet':
      return 'weakset';
    case 'Map':
      return 'map';
    case 'Set':
      return 'set';

    // 8-bit typed arrays
    case 'Int8Array':
      return 'int8array';
    case 'Uint8Array':
      return 'uint8array';
    case 'Uint8ClampedArray':
      return 'uint8clampedarray';

    // 16-bit typed arrays
    case 'Int16Array':
      return 'int16array';
    case 'Uint16Array':
      return 'uint16array';

    // 32-bit typed arrays
    case 'Int32Array':
      return 'int32array';
    case 'Uint32Array':
      return 'uint32array';
    case 'Float32Array':
      return 'float32array';
    case 'Float64Array':
      return 'float64array';
  }

  if (isGeneratorObj(value)) {
    return 'generator';
  }

  // Non-plain objects.
  const typeToString = Object.prototype.toString.call(value);

  // eslint-disable-next-line default-case
  switch (typeToString) {
    case '[object Object]':
      return 'object';
    // Iterators.
    case '[object Map Iterator]':
      return 'mapiterator';
    case '[object Set Iterator]':
      return 'setiterator';
    case '[object String Iterator]':
      return 'stringiterator';
    case '[object Array Iterator]':
      return 'arrayiterator';
  }

  const objectPosition = 8;

  return (
    typeToString
      // remove from "[object" and last "]" from string like [object <THING>]
      .slice(objectPosition, -1)
      .toLowerCase()
      .replace(/\s/g, '')
  );
}
