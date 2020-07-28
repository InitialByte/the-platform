import {deepClone} from '../deep-clone';

describe('1. Deep clone.', () => {
  it('1.1: should clone classes.', () => {
    class testClass {
      foo: 'bar';

      bar() {}
    }

    expect(deepClone(new testClass())).toEqual(new testClass());
  });

  it('1.1: should clone extended classes.', () => {
    class testClass {
      foo: 'bar';

      bar() {}
    }

    class extendedClass extends testClass {
      baz: 'foo';

      fooBar() {}
    }

    expect(deepClone(new extendedClass())).toEqual(new extendedClass());
  });

  it('1.2: should clone one-nested object.', () => {
    expect(deepClone({foo: 'bar', baz: 0})).toEqual({foo: 'bar', baz: 0});
  });

  it('1.3: should clone two-nested object.', () => {
    expect(deepClone({foo: 'bar', baz: 0, bar: {foo: 'baz'}})).toEqual({
      foo: 'bar',
      baz: 0,
      bar: {foo: 'baz'},
    });
  });

  it('1.4: should clone object created with object.create(null).', () => {
    expect(deepClone(Object.create(null))).toEqual(Object.create(null));
  });

  it('1.5: should clone object created with object.create({}).', () => {
    expect(deepClone(Object.create({}))).toEqual(Object.create({}));
  });
});
