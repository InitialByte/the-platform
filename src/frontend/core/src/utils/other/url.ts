/*
 * Usage:
 *
 * import {parseUrl, parseSearchUrl, goTo, reload} from './utils';
 *
 * // Parse current url.
 * // More info:
 * // @link https://developer.mozilla.org/en-US/docs/Web/API/URL
 * const {hostname, port, origin} = parseUrl();
 * const {hostname, protocol} = parseUrl('http://example.com');
 *
 * // More info:
 * // @link https://developers.google.com/web/updates/2016/01/urlsearchparams
 * // @link https://developer.mozilla.org/en-US/docs/Web/API/URLSearchParams
 * const searchUrl = parseSearchUrl('http://example.com/?foo=bar&baz=1');
 * searchUrl.has('baz'); // true
 * searchUrl.has('bar'); // false
 * searchUrl.set('baz', 3);
 *
 * goTo('http://subdomain.example.com/');
 *
 * // Will reload current page.
 * reload();
 */

export const parseUrl = (
  url: string = window.location.toString(),
): URL => new URL(url);

export const parseSearchUrl = (
  url: string = window.location.search,
): URLSearchParams => new URLSearchParams(url);

export const reload = (): void => window.location.reload();

export const goTo = (url: string, keepHistory: boolean = true): void => (
  keepHistory
    ? window.location.assign(url)
    : window.location.replace(url)
);
