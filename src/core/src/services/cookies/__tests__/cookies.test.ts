import {
  getCookie,
  setCookie,
  hasCookie,
  deleteCookie,
  keysCookie,
  deleteAllCookies,
} from '../index';

describe('Cookies.', () => {
  afterEach(() => {
    deleteAllCookies();
  });

  describe('1. Set Cookie.', () => {
    it('1.1: should set cookie with string value.', () => {
      setCookie('foo', 'bar');
      expect(document.cookie).toBe('foo=bar');
    });

    it('1.2: should set cookie with boolean value.', () => {
      setCookie('bar', true);
      expect(document.cookie).toBe('bar=true');
    });

    it('1.3: should set cookie with number value.', () => {
      setCookie('baz', 1000);
      expect(document.cookie).toBe('baz=1000');
    });

    it('1.4: should set cookie with path, samesite.', () => {
      setCookie('foo', 'bar', {
        path: '/',
        sameSite: 'Strict',
      });
      expect(document.cookie).toBe('foo=bar');
    });

    it('1.5: should set cookie with httponly, domain, secure.', () => {
      setCookie('foo', 'bar', {
        httpOnly: true,
        domain: 'domain.com',
        secure: true,
      });
      expect(document.cookie).toBe('');
    });

    it('1.6: should rewrite cookie.', () => {
      setCookie('bar', 'foo');
      expect(document.cookie).toBe('bar=foo');
      setCookie('bar', 'baz');
      expect(document.cookie).toBe('bar=baz');
    });

    // eslint-disable-next-line max-len
    it('1.7: should return false if key in expires,max-age,path,domain,secure,samesite,httponly.', () => {
      expect(setCookie('path', 'bar')).toBe(false);
    });

    it('1.8: should encode key and value.', () => {
      setCookie('#foo', '$bar');
      expect(document.cookie).toBe('%23foo=%24bar');
    });

    it('1.9: should set infinity cookie.', () => {
      const options = {
        end: Infinity,
      };
      setCookie('foo', 'bar', options);
      expect(document.cookie).toBe('foo=bar');
    });

    it('1.10: should set number as expire in cookie.', () => {
      const options = {
        end: 12312973198,
      };
      setCookie('foo', 'bar', options);
      expect(document.cookie).toBe('foo=bar');
    });

    it('1.11: should set date to expire in cookie.', () => {
      const tomorrow = new Date(Date.now() + 24 * 60 * 60 * 1000);
      const options = {
        end: tomorrow,
      };
      setCookie('foo', 'bar', options);
      expect(document.cookie).toBe('foo=bar');
    });
  });

  describe('2. Get Cookie.', () => {
    it('2.1: should return null if empty key.', () => {
      expect(getCookie('')).toBeNull();
    });

    it('2.2: should return correct value.', () => {
      setCookie('baz', 'bar');
      expect(getCookie('baz')).toBe('bar');
    });

    it('2.3: should return null if no cookie.', () => {
      expect(getCookie('foo')).toBeNull();
    });
  });

  describe('3. Delete Cookie.', () => {
    it('3.1: should delete cookie only with key.', () => {
      setCookie('baz', 'bar');
      deleteCookie('baz');
      expect(document.cookie).toBe('');
    });
  });

  describe('4. Delete All Cookies.', () => {
    it('4.1: should delete all cookies.', () => {
      setCookie('bar', 'foo');
      setCookie('baz', 'bar');
      deleteAllCookies();
      expect(document.cookie).toBe('');
    });
  });

  describe('5. Has Cookie.', () => {
    it('5.1: should check if cookie exists.', () => {
      setCookie('foo', 'bar');
      expect(hasCookie('foo')).toBe(true);
      expect(hasCookie('baz')).toBe(false);
    });
  });

  describe('6. Keys Cookie.', () => {
    it('6.1: should return two keys.', () => {
      setCookie('bar', 'foo');
      setCookie('baz', 'bar');
      expect(keysCookie()).toEqual(['bar', 'baz']);
    });
  });
});
