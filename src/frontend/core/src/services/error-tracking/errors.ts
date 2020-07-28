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
];
