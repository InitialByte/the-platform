import * as React from 'react';
import {FC} from 'react';
import {UpdatePasswordForm} from '../components/forms/update-password';

const UpdatePasswordPage: FC = () => <UpdatePasswordForm />;

UpdatePasswordPage.displayName = 'UpdatePasswordPage';

// We have to do it for correct working react lazy
// eslint-disable-next-line import/no-default-export
export default UpdatePasswordPage;
