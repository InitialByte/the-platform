import {Suspense, StrictMode} from 'react';
import {BrowserRouter} from 'react-router-dom';
import {ErrorBoundary, Spinner, CSSBaseline} from '@the_platform/react-uikit';
import {AppContainer} from '../containers/App';
import {Notification} from '../components';

interface IProps {
  modulesRoute: Platform.IRoute[];
}

export const AppRouter = ({modulesRoute = []}: IProps): JSX.Element => (
  <ErrorBoundary>
    <StrictMode>
      <Notification />
      <CSSBaseline />
      <Suspense fallback={<Spinner />}>
        <BrowserRouter>
          <AppContainer modulesRoute={modulesRoute} />
        </BrowserRouter>
      </Suspense>
    </StrictMode>
  </ErrorBoundary>
);

AppRouter.displayName = 'AppRouter';
