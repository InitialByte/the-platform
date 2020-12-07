import {useEffect} from 'react';

export const GAG = ({path, id}): any => {
  useEffect(() => {
    window['GoogleAnalyticsObject'] = 'ga';
    window['ga'] =
      window['ga'] ||
      function () {
        (window['ga'].q = window['ga'].q || []).push(arguments);
      };
    window['ga'].l = +new Date();

    const el = document.createElement('script');
    el.type = 'text/javascript';
    el.async = true;
    el.src = path;

    document.body.appendChild(el);

    window.ga('create', id, 'auto');
    window.ga('send', 'pageview');
  }, []);

  return null;
};
