/* eslint @typescript-eslint/no-array-constructor: 0, no-buffer-constructor: 0,
 no-new-wrappers: 0, no-new-func: 0, @typescript-eslint/no-empty-function: 0,
 @typescript-eslint/no-unused-vars: 0, prefer-rest-params: 0 */

import {kindOf} from '../kind-of';

describe('1. Kind Of.', () => {
  describe('1.1. null and undefined.', () => {
    it('1.1.1: should correct verify undefined.', () => {
      expect(kindOf(undefined)).toBe('undefined');
    });

    it('1.1.2: should correct verify null.', () => {
      expect(kindOf(null)).toBe('null');
    });
  });

  describe('1.2. Primitives.', () => {
    it('1.2.1: should correct verify booleans.', () => {
      expect(kindOf(true)).toBe('boolean');
      expect(kindOf(false)).toBe('boolean');
      expect(kindOf(new Boolean(true))).toBe('boolean');
    });

    it('1.2.2: should correct verify numbers.', () => {
      expect(kindOf(1000)).toBe('number');
      expect(kindOf(new Number(1000))).toBe('number');
    });

    it('1.2.3: should correct verify strings.', () => {
      expect(kindOf('str')).toBe('string');
      expect(kindOf(new String('str'))).toBe('string');
    });
  });

  describe('1.3. Objects.', () => {
    it('1.3.1: should correct verify arguments.', () => {
      // eslint-disable-next-line wrap-iife
      (function foo(): void {
        expect(kindOf(arguments)).toBe('arguments');
      })();
    });

    it('1.3.2: should correct verify buffers.', () => {
      expect(kindOf(new Buffer(''))).toBe('buffer');
    });

    it('1.3.3: should correct verify array buffers.', () => {
      expect(kindOf(new ArrayBuffer(2))).toBe('arraybuffer');
    });

    it('1.3.4: should correct verify objects.', () => {
      function Test(): void {}

      expect(kindOf(new Test())).toBe('object');
      expect(kindOf({})).toBe('object');
      expect(kindOf(Object.create(null))).toBe('object');
      expect(kindOf(Object.create({}))).toBe('object');
      expect(kindOf(new (class {})())).toBe('object');
      expect(kindOf(console)).toBe('object');
    });

    it('1.3.5: should correct verify window object.', () => {
      expect(kindOf(window)).toBe('window');
    });

    it('1.3.6: should correct verify dates.', () => {
      expect(kindOf(new Date())).toBe('date');
    });

    it('1.3.7: should correct verify arrays.', () => {
      expect(kindOf([])).toBe('array');
      expect(kindOf([1, 24, 1000])).toBe('array');
      expect(kindOf(new Array())).toBe('array');
    });

    it('1.3.8: should correct verify regular expressions.', () => {
      expect(kindOf(/./)).toBe('regexp');
      expect(kindOf(new RegExp('^foo$'))).toBe('regexp');
    });

    it('1.3.9: should correct verify functions.', () => {
      expect(kindOf(() => {})).toBe('function');
      expect(kindOf(new Function())).toBe('function');
    });

    it('1.3.10: should correct verify Errors.', () => {
      expect(kindOf(new Error(''))).toBe('error');
      expect(kindOf(new TypeError(''))).toBe('error');
    });
  });

  describe('1.4. ESnext features.', () => {
    it('1.4.1: should correct verify resolved promises.', () => {
      expect(kindOf(Promise.resolve())).toBe('promise');
    });

    it('1.4.2: should correct verify rejected promises.', () => {
      expect(kindOf(Promise.reject())).toBe('promise');
    });

    it('1.4.3: should correct verify generator functions.', () => {
      expect(kindOf(function* foo(): IterableIterator<unknown> {})).toBe(
        'generatorfunction',
      );
    });

    it('1.4.4: should correct verify generator objects.', () => {
      const gen = function* foo(): IterableIterator<unknown> {};
      expect(kindOf(gen())).toBe('generator');
    });

    it('1.4.5: should correct verify template strings.', () => {
      const name = 'Foo';
      expect(kindOf(`Welcome ${name} buddy`)).toBe('string');
    });

    it('1.4.6: should correct verify Map.', () => {
      expect(kindOf(new Map())).toBe('map');
    });

    it('1.4.7: should correct verify WeakMap.', () => {
      expect(kindOf(new WeakMap())).toBe('weakmap');
    });

    it('1.4.8: should correct verify Set.', () => {
      expect(kindOf(new Set())).toBe('set');
    });

    it('1.4.9: should correct verify WeakSet.', () => {
      expect(kindOf(new WeakSet())).toBe('weakset');
    });

    it('1.4.10: should correct verify Set Iterator.', () => {
      expect(kindOf(new Set().values())).toBe('setiterator');
    });
    it('1.4.11: should correct verify Map Iterator.', () => {
      expect(kindOf(new Map().values())).toBe('mapiterator');
    });

    it('1.4.12: should correct verify Array Iterator.', () => {
      expect(kindOf([].entries())).toBe('arrayiterator');
    });

    it('1.4.13: should correct verify String Iterator.', () => {
      expect(kindOf(''[Symbol.iterator]())).toBe('stringiterator');
    });

    it('1.4.14: should correct verify Symbol.', () => {
      expect(kindOf(Symbol('foo'))).toBe('symbol');
      expect(kindOf(Symbol.prototype)).toBe('symbol');
    });

    it('1.4.15: should correct verify Int8Array.', () => {
      expect(kindOf(new Int8Array())).toBe('int8array');
    });

    it('1.4.16: should correct verify Uint8Array.', () => {
      expect(kindOf(new Uint8Array())).toBe('uint8array');
    });

    it('1.4.17: should correct verify Uint8ClampedArray.', () => {
      expect(kindOf(new Uint8ClampedArray())).toBe('uint8clampedarray');
    });

    it('1.4.18: should correct verify Int16Array.', () => {
      expect(kindOf(new Int16Array())).toBe('int16array');
    });

    it('1.4.19: should correct verify Uint16Array.', () => {
      expect(kindOf(new Uint16Array())).toBe('uint16array');
    });

    it('1.4.20: should correct verify Int32Array.', () => {
      expect(kindOf(new Int32Array())).toBe('int32array');
    });

    it('1.4.21: should correct verify Uint32Array.', () => {
      expect(kindOf(new Uint32Array())).toBe('uint32array');
    });

    it('1.4.22: should correct verify Float32Array.', () => {
      expect(kindOf(new Float32Array())).toBe('float32array');
    });

    it('1.4.23: should correct verify Float64Array.', () => {
      expect(kindOf(new Float64Array())).toBe('float64array');
    });
  });
});
