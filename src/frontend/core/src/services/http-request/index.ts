import ky from 'ky';
import {ResponsePromise} from 'ky';
import {Hooks} from 'ky';
import {proxyErrorHandler} from '../../utils';

export * from './statuses';
export {default as pureRequest} from 'ky';

type TKy = typeof ky;

/* eslint-disable import/no-mutable-exports, @typescript-eslint/ban-ts-comment */
// @ts-ignore
export let customRequest: TKy = proxyErrorHandler('HttpRequest') as TKy;

export const customRequestInit = (hooks: Hooks): TKy => {
  customRequest = ky.extend({hooks});
  return customRequest;
};

export {ResponsePromise} from 'ky';

export const loadJsonFile = (filePath: string): ResponsePromise =>
  ky(filePath).json();
