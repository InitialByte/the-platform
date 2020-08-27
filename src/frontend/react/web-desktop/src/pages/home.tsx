import * as React from 'react';
import {FC} from 'react';

const HomePage: FC = () => <div>Home</div>;

HomePage.displayName = 'HomePage';

// We have to do it for correct working react lazy
// eslint-disable-next-line import/no-default-export
export default HomePage;
