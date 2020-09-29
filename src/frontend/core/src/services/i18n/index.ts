import i18n from 'i18next';
import {initReactI18next} from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

const storageName = 'lang';

const defaults = {
  // order and from where user language should be detected
  order: [
    'querystring',
    'cookie',
    'localStorage',
    'sessionStorage',
    'navigator',
    'htmlTag',
    'path',
    'subdomain',
  ],

  // keys or params to lookup language from
  lookupFromSubdomainIndex: 0,
  lookupSessionStorage: storageName,
  lookupLocalStorage: storageName,
  lookupQuerystring: storageName,
  lookupCookie: storageName,
  lookupFromPathIndex: 0,

  // cache user language on
  caches: ['localStorage', 'cookie'],
  // languages to not persist (cookie, localStorage)
  excludeCacheFor: ['cimode'],
  debug: false,
};

export {I18nextProvider, useTranslation} from 'react-i18next';
export const i18next = i18n;
export const initI18n = (settings: any = {}): ReturnType<typeof i18n> =>
  i18n
    // learn more: https://github.com/i18next/i18next-browser-languageDetector
    .use(LanguageDetector)
    .use(initReactI18next)
    // learn more: https://www.i18next.com/overview/configuration-options
    .init({
      ...defaults,
      ...settings,
    });
