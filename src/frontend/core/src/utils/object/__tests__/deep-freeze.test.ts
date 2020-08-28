import {deepFreeze} from '../deep-freeze';

describe('1. Deep Freeze.', () => {
  it('1.1: should freeze an flat object.', () => {
    const obj = deepFreeze({
      foo: 'bar',
      baz: 'foo',
    });

    try {
      obj.bar = 'foo';
      obj.foo = 'foo';
    } catch {}

    expect(obj.bar).toBe(undefined);
    expect(obj.foo).toBe('bar');
  });

  it('1.2: should freeze n-dimensional object.', () => {
    const obj = deepFreeze({
      foo: 'bar',
      baz: 'foo',
      bar: {
        bar: 'foo',
      },
    }) as any;

    try {
      obj.bar.bar = 'foo';
      obj.bar.baz = 'foo';
    } catch {}

    expect(obj.bar.baz).toBe(undefined);
    expect(obj.bar.bar).toBe('foo');
  });

  it('1.3: should freeze flat array.', () => {
    const obj = deepFreeze(['foo', 'bar']) as [string, string];

    try {
      obj[0] = 'bar';
      delete obj[1];
    } catch {}

    expect(obj[0]).toBe('foo');
    expect(obj[1]).toBe('bar');
  });

  it('1.4: should freeze n-dimensional array.', () => {
    const obj = deepFreeze(['foo', 'bar', ['baz', 'bar']]) as [
      string,
      string,
      string[],
    ];
    const secondItem = 2;

    try {
      obj[secondItem].push('foo');
    } catch {}

    expect(obj[secondItem]).toEqual(['baz', 'bar']);
  });
});
