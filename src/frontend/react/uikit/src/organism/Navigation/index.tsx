import * as React from 'react';
import {Link} from 'react-router-dom';

export function Navigation(): JSX.Element {
  return (
    <ul>
      <li>
        <Link to="/">Home</Link>
      </li>
      <li>
        <Link to="/auth/login">Login</Link>
      </li>
      <li>
        <Link to="/auth/logout">Logout</Link>
      </li>
      <li>
        <Link to="/register/create">Register</Link>
      </li>
    </ul>
  );
}

Navigation.displayName = 'Navigation';
