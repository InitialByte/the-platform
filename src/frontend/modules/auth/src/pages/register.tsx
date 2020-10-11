import * as React from 'react';
import {FC} from 'react';
import {RegisterForm} from '../components/forms/register';

const RegisterPage: FC = (props) => <RegisterForm {...props} />;

RegisterPage.displayName = 'RegisterPage';

// We have to do it for correct working react lazy
// eslint-disable-next-line import/no-default-export
export default RegisterPage;
