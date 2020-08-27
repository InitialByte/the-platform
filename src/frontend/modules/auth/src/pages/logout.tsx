import {connect} from 'react-redux';
import {signOut} from '../provider';
import {logout} from '../reducer';

const mapState = (): Record<string, string> => ({});
const mapDispatch = {logoutReducer: logout};

const LogoutPage = connect(
  mapState,
  mapDispatch,
)(({logoutReducer}): null => {
  // eslint-disable-next-line promise/catch-or-return
  signOut().catch(console.error).finally(logoutReducer);

  return null;
});

LogoutPage.displayName = 'LogoutPage';

// We have to do it for correct working react lazy
// eslint-disable-next-line import/no-default-export
export default LogoutPage;
