import {FC, ElementType} from 'react';
import {RecoveryForm} from '../components/forms/recovery-password';

interface IProps {
  Link: ElementType;
}

const RecoveryPasswordPage: FC<IProps> = ({Link}) => (
  <RecoveryForm Link={Link} />
);

RecoveryPasswordPage.displayName = 'RecoveryPasswordPage';

// We have to do it for correct working react lazy
// eslint-disable-next-line import/no-default-export
export default RecoveryPasswordPage;
