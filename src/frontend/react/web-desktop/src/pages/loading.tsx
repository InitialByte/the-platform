import * as React from 'react';

const LoadingPage = (): JSX.Element => <div>Loading</div>;

LoadingPage.displayName = 'LoadingPage';

// We have to do it for correct working react lazy
// eslint-disable-next-line import/no-default-export
export default LoadingPage;
