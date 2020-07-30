import ky from 'ky';
import {proxyErrorHandler} from '../../utils';

export * from './statuses';
export {default as pureRequest} from 'ky';

type TKy = typeof ky;

export let customRequest: TKy = proxyErrorHandler('HttpRequest');

export const customRequestInit = (hooks: any): TKy => {
  customRequest = ky.extend({hooks});
  return customRequest;
};
