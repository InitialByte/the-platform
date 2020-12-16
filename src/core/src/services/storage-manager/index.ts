/*
 * Usage (session or local storages):
 *
 * import {sessionStorageInit} from '@the_platform/core';
 *
 * const session = sessionStorageInit('_APP');
 *
 * session.setItem('foo', 'bar');
 * session.getItem('foo');
 *
 * // Expiration time in ms.
 * // Set timeout for this item.
 * sessionStorage.setItem('bar', 'baz', 5000);
 *
 * OR after storage was initialized.
 *
 * ./bootstrap.ts
 * import {sessionStorageInit} from '@the_platform/core';
 *
 * sessionStorageInit('_APP');
 *
 * ./bar.ts
 * import {sessionStorage} from '@the_platform/core';
 *
 * sessionStorage.getItem('foo');
 * sessionStorage.setItem('bar', 'baz');
 */

import {parseJson, stringifyJson, proxyErrorHandler} from '../../utils';
import {logger} from '../error-tracking';

type NonInstantiated = Record<string, unknown>;
type StorageInstance = StorageManager | NonInstantiated;

interface IStorage {
  value: unknown;
  timestamp: string;
  timeout: number;
}

const isExpired = (updatedAt: number, timeout: number): boolean =>
  timeout > 0 && Date.now() > updatedAt + timeout;

class StorageManager implements Storage {
  private readonly storage: Storage;

  private readonly prefix: string;

  constructor(storage: Storage, prefix: string = 'APP_') {
    this.prefix = prefix;
    this.storage = storage;
  }

  get length(): number {
    return Object.keys(this.storage).map((key: string) =>
      key.startsWith(this.prefix),
    ).length;
  }

  key(index: number): string | null {
    return this.storage.key(index);
  }

  // timeout = 0: endless lifetime.
  setItem(key: string, storageValue: unknown, timeout: number = 0): void {
    try {
      const stringifyValue = (value: unknown): string =>
        stringifyJson({
          // eslint-disable-next-line
          // @ts-ignore
          value,
          // eslint-disable-next-line
          // @ts-ignore
          timestamp: Date.now(),
          // eslint-disable-next-line
          // @ts-ignore
          timeout,
        });

      this.storage.setItem(this.getKey(key), stringifyValue(storageValue));
    } catch (e) {
      logger.error(E_CODE.E_1, e);
    }
  }

  /*
   * @return null for expired value or Error
   *         undefined for empty value
   *         any real value
   */
  // eslint-disable-next-line
  // @ts-ignore
  getItem(key: string): string | null | undefined {
    const item = this.storage.getItem(this.getKey(key));

    if (item) {
      try {
        // eslint-disable-next-line
        // @ts-ignore
        const {timestamp, value, timeout} = parseJson<IStorage>(item);

        return isExpired(Number(timestamp), timeout) ? null : (value as string);
      } catch (e) {
        logger.error(E_CODE.E_1, e);
        return null;
      }
    }

    return undefined;
  }

  removeItem(key: string): void {
    this.storage.removeItem(this.getKey(key));
  }

  clear(): void {
    if (!this.prefix) {
      this.storage.clear();
    } else {
      // Clear storage values with certain prefix.
      Object.keys(this.storage)
        .filter((key): boolean => key.startsWith(this.prefix))
        .forEach((key): void => this.storage.removeItem(key));
    }
  }

  private getKey(key: string): string {
    return `${this.prefix}${key}`;
  }
}

// eslint-disable-next-line import/no-mutable-exports
export let localStorage: StorageInstance = proxyErrorHandler(
  'LocalStorage',
) as StorageInstance;
// eslint-disable-next-line import/no-mutable-exports
export let sessionStorage: StorageInstance = proxyErrorHandler(
  'SessionStorage',
) as StorageInstance;

const createStorage = (storage: Storage) => (prefix: string) =>
  new StorageManager(storage, prefix);

export const sessionStorageInit = (prefix: string = 'APP_'): StorageManager => {
  sessionStorage = createStorage(window.sessionStorage)(prefix);
  return sessionStorage;
};

export const localStorageInit = (prefix: string = 'APP_'): StorageManager => {
  localStorage = createStorage(window.localStorage)(prefix);
  return localStorage;
};
