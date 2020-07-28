import {shallowClone} from '../shallow-clone';

describe('1. Shallow clone.', () => {
  describe('1.1: Objects.', () => {
    it('1.1.1: should shallow clone an array of primitives', () => {
      expect(shallowClone(['foo', 'bar', 'baz'])).toEqual([
        'foo',
        'bar',
        'baz',
      ]);
    });

    it('1.1.2: should shallow clone an array with varied elements.', () => {
      const testValue = [0, 'foo', {}, [{}], [function () {}], function () {}];
      expect(shallowClone(testValue)).toEqual(testValue);
    });

    it('1.1.3: should clone Map.', () => {
      const testValue = new Map([[1, 10]]);
      const clonedValue = shallowClone(testValue);

      testValue.set(2, 4);
      expect(clonedValue).not.toEqual(testValue);
    });

    it('1.1.4: should clone Set.', () => {
      const testValue = new Set([2, 1, 3]);
      const clonedValue = shallowClone(testValue);

      testValue.add(8);
      expect(clonedValue).not.toEqual(testValue);
    });

    it('1.1.5: should shallow clone arrays.', () => {
      expect(shallowClone(['foo', 1, 'bar'])).toEqual(['foo', 1, 'bar']);
    });

    it('1.1.6: should shallow clone a regex with flags.', () => {
      expect(shallowClone(/foo/gi)).toEqual(/foo/gi);
      expect(shallowClone(/foo/gi)).toEqual(/foo/gi);
      expect(shallowClone(/foo/gi)).not.toEqual(/foo/i);
    });

    it('1.1.7: should shallow clone a regex without any flags.', () => {
      expect(shallowClone(/foo/)).toEqual(/foo/);
    });

    it('1.1.8: should shallow clone a date.', () => {
      const testValue = new Date();

      expect(shallowClone(testValue)).toEqual(testValue);
    });

    it('1.1.9: should shallow clone objects.', () => {
      expect(shallowClone({foo: 1, bar: 2, baz: 3})).toEqual({
        foo: 1,
        bar: 2,
        baz: 3,
      });
    });

    it('1.1.10: should shallow clone an array of objects.', () => {
      const testValue = [{foo: 0}, {bar: 1}];

      expect(shallowClone(testValue)).toEqual(testValue);
    });
  });

  describe('1.2: Primitives.', () => {
    it('1.2.1: should clone correct primitives.', () => {
      expect(shallowClone(0)).toBe(0);
      expect(shallowClone('0')).not.toBe(0);
      expect(shallowClone('foo')).toBe('foo');
      expect(shallowClone(true)).toBe(true);
      expect(shallowClone(null)).toBe(null);
      expect(shallowClone(null)).not.toBe(undefined);
      expect(shallowClone(undefined)).toBe(undefined);
      expect(shallowClone(undefined)).not.toBe(null);
    });

    it('1.2.2: should clone symbols.', () => {
      const testValue = {
        prop: Symbol(),
      };
      const clonedValue = shallowClone(testValue) as {
        prop: symbol;
      };

      expect(typeof clonedValue.prop).toBe('symbol');
      expect(clonedValue).toEqual(testValue);
      expect(clonedValue.prop).toEqual(testValue.prop);
    });
  });
});
