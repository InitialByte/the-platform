import {FC} from 'react';
import {UpdatePasswordForm} from '../components/forms/update-password';

const UpdatePasswordPage: FC = (props) => <UpdatePasswordForm {...props} />;

UpdatePasswordPage.displayName = 'UpdatePasswordPage';

// We have to do it for correct working react lazy
// eslint-disable-next-line import/no-default-export
export default UpdatePasswordPage;
