import {useDispatch} from 'react-redux';
import {fetchLogout} from '../reducer';

const LogoutPage = (): null => {
  const dispatch = useDispatch();
  dispatch(fetchLogout());
  return null;
};

LogoutPage.displayName = 'LogoutPage';

// We have to do it for correct working react lazy
// eslint-disable-next-line import/no-default-export
export default LogoutPage;
