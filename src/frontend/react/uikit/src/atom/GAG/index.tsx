/* eslint-disable */
import {useEffect} from 'react';

interface IProps {
  path: string;
  id: string;
}

export const GAG = ({path, id}: IProps): null => {
  useEffect(() => {
    window.GoogleAnalyticsObject = 'ga';
    window.ga =
      window.ga ||
      function () {
        (window.ga.q = window.ga.q || []).push(arguments);
      };
    window.ga.l = +new Date();

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
