import * as React from 'react';
import {FC} from 'react';
import {Link} from 'react-router-dom';
import {Link as UILink} from '@the_platform/react-uikit';

const HomePage: FC = () => (
  <div>
    Home.
    <Link component={UILink} to="auth/logout" variant="body2">
      Logout
    </Link>
  </div>
);

HomePage.displayName = 'HomePage';

// We have to do it for correct working react lazy
// eslint-disable-next-line import/no-default-export
export default HomePage;
