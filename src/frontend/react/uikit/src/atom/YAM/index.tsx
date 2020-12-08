/* eslint-disable */
import {useEffect} from 'react';

interface IProps {
  path: string;
  accounts: string[];
  options: {
    defer?: boolean;
    webvisor?: boolean;
  };
  version: '1' | '2';
}

export const YAM = ({
  path,
  accounts = [],
  version = '1',
  options = {},
}: IProps): null => {
  useEffect(() => {
    const callbackQueue = 'yandex_metrika_callbacks';
    const accountListName = 'yandex_metrika_accounts';

    window[accountListName] = (window[accountListName] || []).concat(accounts);
    (window[callbackQueue] || []).push(() => {
      accounts.forEach((id) => {
        const defaultOptions = {id};
        window[`yaCounterVersion${id}`] = version;

        try {
          window[`yaCounter${id}`] = new Ya.Metrika({
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
