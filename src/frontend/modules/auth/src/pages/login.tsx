import * as React from 'react';
import {FC, ElementType} from 'react';
import {LoginForm} from '../components/forms/login';

interface IProps {
  Link: ElementType;
}

const LoginPage: FC<IProps> = ({Link}) => <LoginForm Link={Link} />;

LoginPage.displayName = 'LoginPage';

// We have to do it for correct working react lazy
// eslint-disable-next-line import/no-default-export
export default LoginPage;
