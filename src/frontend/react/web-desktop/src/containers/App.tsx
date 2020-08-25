import {useEffect} from 'react';
import {useLocation} from 'react-router-dom';

export const AppContainer = ({children}): JSX.Element => {
  const location = useLocation();

  useEffect(() => {
    console.log('Location', location);
  }, [location]);

  return children;
};
