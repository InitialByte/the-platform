import * as React from 'react';
import {Suspense, StrictMode} from 'react';
import {
  BrowserRouter,
  Routes,
  Route,
} from 'react-router-dom';
import {Navigation, ErrorBoundary, Spinner} from '@the_platform/react-uikit';
import {router} from './router';

interface IProps {
  modulesRoute: Platform.IRoute[];
}

export const AppRouter = ({
  modulesRoute = [],
}: IProps): JSX.Element => (
  <ErrorBoundary>
    <StrictMode>
      <Suspense fallback={<Spinner />}>
        <BrowserRouter>
          <Navigation />
          <Routes>
            {[...router, ...modulesRoute].map(({path, Page}) => (
              <Route
                element={<Page />}
                path={path}
                key={path}
              />
            ))}
          </Routes>
        </BrowserRouter>
      </Suspense>
    </StrictMode>
  </ErrorBoundary>
);

AppRouter.displayName = 'AppRouter';
