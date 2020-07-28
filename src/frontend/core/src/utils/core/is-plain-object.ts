export const isPlainObject = (value: unknown): boolean =>
  value != null
  && typeof value === 'object'
  && Array.isArray(value) === false
  && Object.prototype.toString.call(value) === '[object Object]';
