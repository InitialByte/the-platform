import * as React from 'react';
import {FC} from 'react';

const NotFoundPage: FC = () => <div>NotFound</div>;

NotFoundPage.displayName = 'NotFoundPage';

// We have to do it for correct working react lazy
// eslint-disable-next-line import/no-default-export
export default NotFoundPage;
