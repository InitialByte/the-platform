import ky from 'ky';
import {Hooks} from 'ky';
import {proxyErrorHandler} from '../../utils';

export * from './statuses';
export {default as pureRequest} from 'ky';

type TKy = typeof ky;

// eslint-disable-next-line import/no-mutable-exports
export let customRequest: TKy = proxyErrorHandler('HttpRequest') as TKy;

export const customRequestInit = (hooks: Hooks): TKy => {
  customRequest = ky.extend({hooks});
  return customRequest;
};

export {ResponsePromise} from 'ky';
