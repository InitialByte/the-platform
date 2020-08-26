import * as React from 'react';
import {useEffect} from 'react';
import {useLocation} from 'react-router-dom';
import {connect} from 'react-redux';
import {Routes, Route, Navigate} from 'react-router-dom';
import {Navigation} from '@the_platform/react-uikit';
import {kindOf} from '@the_platform/core';
import * as routes from '@the_platform/routes';
import {importModule, activateModule} from '../store/reducers/modules';
import {injectReducer} from '../store/configuration';
import {router} from '../routes/router';
import {ROUTE_LOGIN} from '../routes/routes';

const mapState = ({modules, auth}) => ({
  modules,
  isAuth: auth?.isAuth ?? false,
});
const mapDispatch = {importModule, activateModule};

export const AppContainer = connect(
  mapState,
  mapDispatch,
)(
  ({
    modules,
    isAuth,
    modulesRoute,
    importModule,
    activateModule,
  }): JSX.Element => {
    const {pathname} = useLocation();
    const {imported, active, paths} = modules;

    useEffect(() => {
      const {shortName} = paths.find(({path}) => path === location.pathname) || [];

      if (shortName) {
        if (!imported.includes(shortName)) {
          const reducer = routes[`${shortName}Reducer`];
          const bootstrap = routes[`${shortName}Bootstrap`];

          if (reducer && kindOf(reducer) === 'function') {
            try {
              injectReducer(shortName, reducer);
            } catch (e) {
              console.error(e);
            }
          }

          if (bootstrap && kindOf(bootstrap) === 'function') {
            try {
              bootstrap();
            } catch (e) {
              console.error(e);
            }
          }

          importModule(shortName);
        }

        if (active !== shortName) {
          activateModule(shortName);
        }
      }
    }, [pathname]);

    return (
      <>
        <Navigation />
        <Routes>
          {[...router, ...modulesRoute].map(
            ({path, Page, isPrivate = false}) => (
              <Route
                element={
                  isPrivate && !isAuth ? (
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
      </>
    );
  },
);
