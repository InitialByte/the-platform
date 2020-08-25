import * as React from 'react';
import {Suspense, StrictMode} from 'react';
import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom';
import {
  Navigation,
  ErrorBoundary,
  Spinner,
  CSSBaseline,
} from '@the_platform/react-uikit';
import {AppContainer} from '../containers/App';
import {router} from './router';
import {ROUTE_LOGIN} from './routes';

interface IProps {
  modulesRoute: Platform.IRoute[];
}

// @TODO
const isAuthed = false;

export const AppRouter = ({modulesRoute = []}: IProps): JSX.Element => (
  <ErrorBoundary>
    <StrictMode>
      <CSSBaseline />
      <Suspense fallback={<Spinner />}>
        <BrowserRouter>
          <AppContainer>
            <Navigation />
            <Routes>
              {[...router, ...modulesRoute].map(
                ({path, Page, isPrivate = false}) => (
                  <Route
                    element={
                      isPrivate && !isAuthed ? (
                        <Navigate to={ROUTE_LOGIN} replace />
                      ) : (
                        <Page />
                      )
                    }
                    path={path}
                    key={path}
                  />
                ),
              )}
            </Routes>
          </AppContainer>
        </BrowserRouter>
      </Suspense>
    </StrictMode>
  </ErrorBoundary>
);

AppRouter.displayName = 'AppRouter';
