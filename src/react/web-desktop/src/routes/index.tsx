import {Suspense, StrictMode} from 'react';
import {BrowserRouter} from 'react-router-dom';
import {
  ErrorBoundary,
  Spinner,
  CSSBaseline,
  GAG,
  YAM,
  StylesProvider,
} from '@the_platform/react-uikit';
import {generateClassName} from '@the_platform/core';
import {AppContainer} from '../containers/App';
import {Notification} from '../components';

interface IProps {
  modulesRoute: Platform.IRoute[];
}

// eslint-disable-next-line no-underscore-dangle
const isProduction = window?.__INITIAL_STATE__?.env?.mode === 'production';

export const AppRouter = ({modulesRoute = []}: IProps): JSX.Element => (
  <ErrorBoundary>
    <StrictMode>
      <GAG path={isProduction ? '/gap.js' : '/stub.js'} id="1" />
      <YAM
        path={isProduction ? '/yap.js' : '/stub.js'}
        accounts={['1']}
        options={{
          defer: true,
          webvisor: true,
        }}
        version="1"
      />
      {/* eslint-disable-next-line @typescript-eslint/no-unsafe-assignment */}
      <StylesProvider generateClassName={generateClassName()}>
        <Notification />
        <CSSBaseline />
        <Suspense fallback={<Spinner />}>
          <BrowserRouter>
            <AppContainer modulesRoute={modulesRoute} />
          </BrowserRouter>
        </Suspense>
      </StylesProvider>
    </StrictMode>
  </ErrorBoundary>
);

AppRouter.displayName = 'AppRouter';
