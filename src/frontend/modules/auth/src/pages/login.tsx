import * as React from 'react';
import {Paper} from '@the_platform/react-uikit';
import {LoginForm} from '../parts/login-form';

const LoginPage = (): JSX.Element => (
  <Paper>
    <h1>Authentication</h1>
    <LoginForm />
  </Paper>
);

LoginPage.displayName = 'LoginPage';

// We have to do it for correct working react lazy
// eslint-disable-next-line import/no-default-export
export default LoginPage;
