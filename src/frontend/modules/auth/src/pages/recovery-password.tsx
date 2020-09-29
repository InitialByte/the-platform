import * as React from 'react';
import {FC} from 'react';
import {RecoveryForm} from '../components/forms/recovery-password';

const RecoveryPasswordPage: FC = () => <RecoveryForm />;

RecoveryPasswordPage.displayName = 'RecoveryPasswordPage';

// We have to do it for correct working react lazy
// eslint-disable-next-line import/no-default-export
export default RecoveryPasswordPage;
