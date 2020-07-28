import {
  sessionStorageInit,
  localStorageInit,
  sessionStorage,
  localStorage,
} from '../index';

describe('1. Storage Manager.', () => {
  describe('1.1. SessionStorage.', () => {
    describe('1.1.1. Non instantiated.', () => {
      it('1.1.1.1: should throw error for non instantiated session storage.', () => {
        // We're forcibly throwing an error.
        // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
        // @ts-ignore
        expect(() => sessionStorage.setItem('foo', 'bar')).toThrowError(
          'SessionStorage was not instantiated.',
        );
        // We're forcibly throwing an error.
        // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
        // @ts-ignore
        expect(() => sessionStorage.getItem('foo')).toThrowError(
          'SessionStorage was not instantiated.',
        );
      });
    });

    describe('1.1.2. Instantiated.', () => {
      const session = sessionStorageInit('FOO_');

      afterEach(() => {
        session.clear();
      });

      it('1.1.2.1: should set item and get correct value.', () => {
        session.setItem('foo', 'bar');
        expect(session.getItem('foo')).toBe('bar');
      });

      it('1.1.2.2: should get undefined item.', () => {
        expect(session.getItem('baz')).toBe(undefined);
      });

      it('1.1.2.3: should remove item.', () => {
        session.setItem('foo', 'bar');
        session.removeItem('foo');
        expect(session.getItem('foo')).toBe(undefined);
      });

      it('1.1.2.4: should return correct length.', () => {
        const numberOfItems = 3;

        session.setItem('foo', 'bar');
        session.setItem('bar', 'foo');
        session.setItem('baz', 'baz');

        expect(session.length).toBe(numberOfItems);
      });

      it('1.1.2.5: should clear all items.', () => {
        session.setItem('foo', 'bar');
        session.setItem('bar', 'foo');
        session.setItem('baz', 'baz');
        session.clear();

        expect(session.length).toBe(0);
        expect(session.getItem('foo')).toBe(undefined);
        expect(session.getItem('bar')).toBe(undefined);
        expect(session.getItem('baz')).toBe(undefined);
      });

      it('1.1.2.6: should return correct key for index.', () => {
        session.setItem('bar', 'baz');
        expect(session.key(0)).toBe('FOO_bar');
      });

      it('1.1.2.7: should remove all items for storage without prefix.', () => {
        const sessionWithNoPrefix = sessionStorageInit('');
        sessionWithNoPrefix.setItem('foo', 'bar');
        sessionWithNoPrefix.setItem('bar', 'foo');
        sessionWithNoPrefix.setItem('baz', 'baz');
        sessionWithNoPrefix.clear();
        expect(sessionWithNoPrefix.length).toBe(0);
      });

      it('1.1.2.8: should create an instance with default prefix.', () => {
        const sessionWithDefaultPrefix = sessionStorageInit();
        sessionWithDefaultPrefix.setItem('bar', 'baz');
        expect(sessionWithDefaultPrefix.key(0)).toBe('APP_bar');
      });

      it('1.1.2.9: should return value for storage with timeout and return null if expired', () => {
        const lifeTime = 100;
        const {now} = Date;

        jest.useFakeTimers();
        Date.now = () => 1;
        session.setItem('bar', 'baz', lifeTime);
        expect(session.getItem('bar')).toBe('baz');
        Date.now = () => lifeTime + lifeTime;
        setTimeout(() => expect(session.getItem('bar')).toBe(null));
        jest.runAllTimers();

        Date.now = now;
      });
    });
  });

  describe('1.2: LocalStorage.', () => {
    describe('1.2.1. Non instantiated.', () => {
      it('1.2.1.1: should throw error for non instantiated local storage.', () => {
        // We're forcibly throwing an error.
        // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
        // @ts-ignore
        expect(() => localStorage.setItem('foo', 'bar')).toThrowError(
          'LocalStorage was not instantiated.',
        );
        // We're forcibly throwing an error.
        // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
        // @ts-ignore
        expect(() => localStorage.getItem('foo')).toThrowError(
          'LocalStorage was not instantiated.',
        );
      });
    });

    describe('1.2.2. Instantiated.', () => {
      const local = localStorageInit('FOO_');

      it('1.2.2.1: should set item.', () => {
        local.setItem('foo', 'bar');
        expect(local.getItem('foo')).toBe('bar');
      });

      it('1.2.2.2: should get undefined item.', () => {
        expect(local.getItem('baz')).toBe(undefined);
      });

      it('1.2.2.3: should remove item.', () => {
        local.setItem('foo', 'bar');
        local.removeItem('foo');
        expect(local.getItem('foo')).toBe(undefined);
      });

      it('1.1.2.4: should return correct length.', () => {
        const numberOfItems = 3;

        local.setItem('foo', 'bar');
        local.setItem('bar', 'foo');
        local.setItem('baz', 'baz');

        expect(local.length).toBe(numberOfItems);
      });

      it('1.1.2.5: should clear all items.', () => {
        local.setItem('foo', 'bar');
        local.setItem('bar', 'foo');
        local.setItem('baz', 'baz');
        local.clear();

        expect(local.length).toBe(0);
        expect(local.getItem('foo')).toBe(undefined);
        expect(local.getItem('bar')).toBe(undefined);
        expect(local.getItem('baz')).toBe(undefined);
      });

      it('1.1.2.6: should return correct key for index.', () => {
        local.setItem('bar', 'baz');
        expect(local.key(0)).toBe('FOO_bar');
      });

      it('1.1.2.7: should remove all items for storage without prefix.', () => {
        const localWithNoPrefix = localStorageInit('');
        localWithNoPrefix.setItem('foo', 'bar');
        localWithNoPrefix.setItem('bar', 'foo');
        localWithNoPrefix.setItem('baz', 'baz');
        localWithNoPrefix.clear();
        expect(localWithNoPrefix.length).toBe(0);
      });

      it('1.1.2.8: should create an instance with default prefix.', () => {
        const localWithDefaultPrefix = localStorageInit();
        localWithDefaultPrefix.setItem('bar', 'baz');
        expect(localWithDefaultPrefix.key(0)).toBe('APP_bar');
      });

      it('1.1.2.9: should return value for storage with timeout and return null if expired', () => {
        const lifeTime = 100;
        const {now} = Date;

        jest.useFakeTimers();
        Date.now = () => 1;
        local.setItem('bar', 'baz', lifeTime);
        expect(local.getItem('bar')).toBe('baz');
        Date.now = () => lifeTime + lifeTime;
        setTimeout(() => expect(local.getItem('bar')).toBe(null));
        jest.runAllTimers();

        Date.now = now;
      });
    });
  });
});
