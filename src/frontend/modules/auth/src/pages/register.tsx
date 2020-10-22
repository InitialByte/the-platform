import * as React from 'react';
import {FC, ElementType} from 'react';
import {RegisterForm} from '../components/forms/register';

interface IProps {
  Link: ElementType;
}

const RegisterPage: FC<IProps> = ({Link}) => <RegisterForm Link={Link} />;

RegisterPage.displayName = 'RegisterPage';

// We have to do it for correct working react lazy
// eslint-disable-next-line import/no-default-export
export default RegisterPage;
