import i18n from 'i18next';
import {initReactI18next} from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

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
  lookupQuerystring: 'lang',
  lookupCookie: 'lang',
  lookupLocalStorage: 'lang',
  lookupSessionStorage: 'lang',
  lookupFromPathIndex: 0,
  lookupFromSubdomainIndex: 0,

  // cache user language on
  caches: ['localStorage', 'cookie'],
  excludeCacheFor: ['cimode'], // languages to not persist (cookie, localStorage)
  fallbackLng: 'en',
  debug: true,
};

export const initI18n = (settings): ReturnType<typeof i18n> =>
  i18n
    // learn more: https://github.com/i18next/i18next-browser-languageDetector
    .use(LanguageDetector)
    .use(initReactI18next)
    // learn more: https://www.i18next.com/overview/configuration-options
    .init({
      ...defaults,
      ...settings,
    });
