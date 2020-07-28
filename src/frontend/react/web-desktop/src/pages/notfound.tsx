import * as React from 'react';

const NotFoundPage = (): JSX.Element => <div>NotFound</div>;

NotFoundPage.displayName = 'NotFoundPage';

// We have to do it for correct working react lazy
// eslint-disable-next-line import/no-default-export
export default NotFoundPage;
