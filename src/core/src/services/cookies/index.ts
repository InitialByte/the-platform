/*
 * Expires=<date>
 * Max-Age=<non-zero-digit>
 * Domain=<domain-value>
 * Path=<path-value>
 * Secure
 * HttpOnly
 * SameSite=<Strict | Lax | None>
 *
 * @link https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Set-Cookie
 *
 * Usage:
 *
 * import {
 *   setCookie,
 *   getCookie,
 *   deleteAllCookies,
 *   deleteCookie,
 *   hasCookie,
 *   keysCookie,
 * } from './cookies';
 *
 * setCookie('foo', 'bar');
 * const cookie = getCookie('foo');
 * deleteCookie('foo');
 *
 * deleteAllCookies();
 *
 * hasCookie('foo');
 *
 * const keys = keysCookie();
 *
 * setCookie('foo', 'bar', {
 *  end: Infinity,
 *  path: '/',
 *  domain: 'domain.com',
 *  secure: true,
 *  httpOnly: true,
 *  sameSite: 'Strict',
 * });
 *
 * setCookie('foo', 'bar', {
 *   end: 1574937852,
 * });
 *
 * setCookie('foo', 'bar', {
 *   end: 'Thu, 31 Dec 2099 23:59:59 GMT',
 * });
 *
 * setCookie('foo', 'bar', {
 *   end: new Date(),
 * });
 *
 */

type TSameSite = 'Strict' | 'Lax' | 'None';

interface ICookieOptions {
  end?: number | string | Date;
  path?: string;
  domain?: string;
  secure?: boolean;
  sameSite?: TSameSite;
  httpOnly?: boolean;
}

const decode = decodeURIComponent;
const encode = encodeURIComponent;

const regGet = (key: string): string =>
  [
    '(?:(?:^|.*;)\\s*',
    encode(key).replace(/[*+-.]/g, '\\$&'),
    '\\s*\\=\\s*([^;]*).*$)|^.*$',
  ].join('');

const regCheck = (key: string): string =>
  [
    '^(.*;)?\\s*',
    encode(key).replace(/[*+-.]/g, '\\$&'),
    '\\s*=\\s*[^;]+(.*)?$',
  ].join('');

const isInvalidKey = (key: string): boolean =>
  !key ||
  /^(?:expires|max-age|path|domain|secure|samesite|httponly)$/i.test(key);

export const getCookie = (key: string): string | null => {
  if (!key) {
    return null;
  }

  return decode(document.cookie.replace(new RegExp(regGet(key)), '$1')) || null;
};

export const setCookie = (
  key: string,
  value: string | number | boolean,
  options: ICookieOptions = {},
): boolean | Error => {
  if (isInvalidKey(key)) {
    return false;
  }

  const {end, path, domain, secure, sameSite, httpOnly} = options;

  let expires = '';

  if (end) {
    if (typeof end === 'number') {
      expires =
        end === Infinity
          ? ';Expires=Thu, 31 Dec 2099 23:59:59 GMT'
          : `;Max-Age=${end}`;
    } else if (typeof end === 'string') {
      expires = `;Expires=${end}`;
    } else {
      expires = `;Expires=${end.toUTCString()}`;
    }
  }

  document.cookie = [
    encode(key),
    '=',
    encode(value),
    expires,
    domain ? `;Domain=${domain}` : '',
    sameSite ? `;SameSite=${sameSite}` : '',
    path ? `;Path=${path}` : '',
    secure ? ';Secure' : '',
    httpOnly ? ';HttpOnly' : '',
  ]
    .join('')
    .trim();

  return true;
};

export const hasCookie = (key: string): boolean => {
  if (isInvalidKey(key)) {
    return false;
  }

  return new RegExp(regCheck(key)).test(document.cookie);
};

// TODO add find by path and domain.
export const deleteCookie = (key: string): boolean | Error => {
  if (!hasCookie(key)) {
    return false;
  }

  return setCookie(key, '', {
    end: 'Thu, 01 Jan 1970 00:00:00 GMT',
  });
};

export const deleteAllCookies = (): void =>
  document.cookie
    .split(';')
    .forEach((cookie) => deleteCookie(decode(cookie.trim().split('=')[0])));

export const keysCookie = (): string[] =>
  document.cookie
    .replace(/((?:^|\s*;)[^=]+)(?=;|$)|^\s*|\s*(?:=[^;]*)?(?:\1|$)/g, '')
    .split(/\s*(?:=[^;]*)?;\s*/)
    .map((key: string): string => decode(key));
