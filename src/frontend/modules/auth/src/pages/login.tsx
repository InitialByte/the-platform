import * as React from 'react';
import {FC} from 'react';
import {LoginForm} from '../components/forms/login';

const LoginPage: FC = (props) => <LoginForm {...props} />;

LoginPage.displayName = 'LoginPage';

// We have to do it for correct working react lazy
// eslint-disable-next-line import/no-default-export
export default LoginPage;
