import * as React from 'react';
import {FC} from 'react';

const NotFoundPage: FC = () => (
  <>
    <div>Page not found :(</div>
    Maybe the page you are looking for has been removed, or you typed in the
    wrong URL
  </>
);

NotFoundPage.displayName = 'NotFoundPage';

// We have to do it for correct working react lazy
// eslint-disable-next-line import/no-default-export
export default NotFoundPage;
