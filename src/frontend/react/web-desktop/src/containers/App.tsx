import * as React from 'react';
import {useEffect, FC} from 'react';
import {Reducer} from 'redux';
import {useLocation} from 'react-router-dom';
import {connect} from 'react-redux';
import {Routes, Route, Navigate} from 'react-router-dom';
import {AuthLayout, WithSidebarLayout} from '@the_platform/react-uikit';
import * as routes from '@the_platform/routes';
import {
  importModule,
  activateModule,
  IModuleState,
} from '../store/reducers/modules';
import {injectReducer} from '../store/configuration';
import {router} from '../routes/router';
import {ROUTE_LOGIN} from '../routes/routes';

interface IMapStateProps {
  modules: IModuleState;
  isAuth: boolean;
}

interface IProps {
  modules: IModuleState;
  isAuth: boolean;
  auth: {
    isAuth: boolean,
  };
  modulesRoute: Platform.IRoute[];
  importModuleDispatch: typeof importModule;
  activateModuleDispatch: typeof activateModule;
}

const mapState = ({
  modules,
  auth,
}: Pick<IProps, 'auth' | 'modules'>): IMapStateProps => ({
  modules,
  isAuth: auth?.isAuth ?? false,
});
const mapDispatch = {
  importModuleDispatch: importModule,
  activateModuleDispatch: activateModule,
};
const tryCatchFnRun = (fn: unknown): void => {
  if (fn && typeof fn === 'function') {
    try {
      fn();
    } catch (e) {
      console.error(e);
    }
  }
};

export const AppContainer = connect(
  mapState,
  mapDispatch,
)(
  ({
    modules,
    isAuth,
    modulesRoute,
    importModuleDispatch,
    activateModuleDispatch,
  }: Omit<IProps, 'auth'>): JSX.Element => {
    const {pathname} = useLocation();
    const {imported, active, paths} = modules;

    const RenderLayout: FC = ({layout, children}) => {
      if (layout === 'Auth') {
        return <AuthLayout>{children}</AuthLayout>;
      }

      return <WithSidebarLayout>{children}</WithSidebarLayout>;
    };

    useEffect((): void => {
      const found = paths.find(({path}) => path === pathname);
      const shortName = found ? found.shortName : '';

      // Attaching reducers on demand and run bootstrap function for module if exists
      if (shortName && !imported.includes(shortName)) {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        const reducer = routes[`${shortName}Reducer`] as Reducer;
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        const bootstrap = routes[`${shortName}Bootstrap`] as () => void;

        if (reducer && typeof reducer === 'function') {
          try {
            injectReducer(shortName, reducer);
          } catch (e) {
            console.error(e);
          }
        }

        tryCatchFnRun(bootstrap);
        importModuleDispatch(shortName);
      }

      if (shortName && active !== shortName) {
        activateModuleDispatch(shortName);
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [pathname]);

    return (
      <Routes>
        {[...router, ...modulesRoute].map(
          ({
            path,
            Page,
            isPrivate = false,
            layout = 'WithSidebar',
          }: Platform.IRoute) => (
            <Route
              element={
                isPrivate && !isAuth ? (
                  <Navigate to={ROUTE_LOGIN} replace />
                ) : (
                  <RenderLayout layout={layout}>
                    <Page />
                  </RenderLayout>
                )
              }
              path={path}
              key={path}
            />
          ),
        )}
      </Routes>
    );
  },
);
