import {isPlainObject} from '../is-plain-object';

describe('1. isPlainObject.', () => {
  it('1.1: should not detect null as plain object.', () => {
    expect(isPlainObject(null)).toBe(false);
  });

  it('1.2: should not detect undefined as plain object.', () => {
    expect(isPlainObject(undefined)).toBe(false);
  });

  it('1.3: should not detect array as plain object.', () => {
    expect(isPlainObject([])).toBe(false);
  });

  it('1.4: should detect object as plain object.', () => {
    expect(isPlainObject({})).toBe(true);
  });

  it('1.5: should detect object as plain object created from object.create with null.', () => {
    const testValue = Object.create(null);
    expect(isPlainObject(testValue)).toBe(true);
  });

  it('1.6: should detect object as plain object if it has object-like constructor.', () => {
    const testValue = Object.create({});
    testValue.constructor = {};
    expect(isPlainObject(testValue)).toBe(true);
  });

  it('1.7: should detect object as plain object if it has prototype equals to null.', () => {
    const testValue = Object.create({});
    testValue.prototype = null;
    expect(isPlainObject(testValue)).toBe(true);
  });

  it('1.8: should detect class as plain object.', () => {
    expect(isPlainObject(new class {}())).toBe(true);
  });
});
