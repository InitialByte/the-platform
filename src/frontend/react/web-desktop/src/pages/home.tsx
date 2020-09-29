import * as React from 'react';
import {FC} from 'react';
import {Link} from 'react-router-dom';

const HomePage: FC = () => (
  <div>
    Home.
    <Link to="auth/logout" variant="body2">
      Logout
    </Link>
    <Link to="auth/update-password" variant="body2">
      Update Password
    </Link>
  </div>
);

HomePage.displayName = 'HomePage';

// We have to do it for correct working react lazy
// eslint-disable-next-line import/no-default-export
export default HomePage;
