import {proxyErrorHandler} from '../error-handler';

describe('1. Proxy Error handler.', () => {
  it('1.1: should throw error.', () => {
    const proxy = proxyErrorHandler('Foo');
    const errorMessage = 'Foo was not instantiated.';

    expect(() => {
      // We're forcibly throwing an error.
      // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
      // @ts-ignore
      proxy.getItem('foo');
    }).toThrowError(errorMessage);

    expect(() => {
      // We're forcibly throwing an error.
      // eslint-disable-next-line @typescript-eslint/no-unused-expressions
      proxy.foo;
    }).toThrowError(errorMessage);
  });
});
