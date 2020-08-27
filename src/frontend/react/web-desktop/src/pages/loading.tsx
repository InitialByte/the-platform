import * as React from 'react';
import {FC} from 'react';

const LoadingPage: FC = () => <div>Loading</div>;

LoadingPage.displayName = 'LoadingPage';

// We have to do it for correct working react lazy
// eslint-disable-next-line import/no-default-export
export default LoadingPage;
