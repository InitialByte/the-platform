import {useEffect} from 'react';

export const YAM = ({path, accounts = [], version = 1, options = {}}): any => {
  useEffect(() => {
    const callbackQueue = 'yandex_metrika_callbacks';
    const accountListName = 'yandex_metrika_accounts';

    window[accountListName] = (window[accountListName] || []).concat(accounts);
    (window[callbackQueue] || []).push(() => {
      accounts.forEach((id) => {
        const defaultOptions = {id};
        window[`yaCounterVersion${id}`] = version;

        try {
          window[`yaCounter${id}`] = new Ya['Metrika']({
            ...defaultOptions,
            ...options,
          });
        } catch (e) {
          console.warn(e);
        }
      });
    });

    const el = document.createElement('script');
    el.type = 'text/javascript';
    el.async = true;
    el.src = path;

    document.body.appendChild(el);
  }, []);

  return null;
};
