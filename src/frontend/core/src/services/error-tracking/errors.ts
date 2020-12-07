import './global';

export const appErrors: Platform.IError[] = [
  {
    code: E_CODE.E_1,
    type: E_TYPE.UNKNOWN,
    title: 'An unknown error.',
  },
  {
    code: E_CODE.E_100,
    type: E_TYPE.CRITICAL,
    title: 'Error to bootstrap the application.',
  },
  {
    code: E_CODE.E_101,
    type: E_TYPE.CRITICAL,
    title: 'No mount point (id or class) in HTML.',
  },
  {
    code: E_CODE.E_102,
    type: E_TYPE.CRITICAL,
    title: 'Duplicate routes.',
  },
  {
    code: E_CODE.E_103,
    type: E_TYPE.CRITICAL,
    title: 'Service Worker Error.',
  },
  {
    code: E_CODE.E_104,
    type: E_TYPE.CRITICAL,
    title: 'Auth check token.',
  },
];
