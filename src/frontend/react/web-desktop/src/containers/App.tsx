import {useEffect, useState, FC} from 'react';
import {Reducer} from 'redux';
import {connect} from 'react-redux';
import {
  useLocation,
  useNavigate,
  Routes,
  Route,
  Link,
  Navigate,
} from 'react-router-dom';
import {logger, i18next, loadJsonFile} from '@the_platform/core';
import {AuthLayout, WithSidebarLayout} from '@the_platform/react-uikit';
import * as routes from '@the_platform/routes';
import {
  importModule,
  activateModule,
  IModuleState,
} from '../store/reducers/modules';
import {MainMenu} from '../components';
import {injectReducer, store} from '../store/configuration';
import {router} from '../routes/router';
import {ROUTE_LOGIN, ROUTE_HOME} from '../routes/routes';
import {TLang, Ii18nState, changeLocale} from '../store/reducers/i18n';

interface IProps {
  modules: IModuleState;
  isAuth: boolean;
  auth: {
    isAuth: boolean,
  };
  i18n: Ii18nState;
  modulesRoute: Platform.IRoute[];
  importModuleDispatch: typeof importModule;
  activateModuleDispatch: typeof activateModule;
  changeLocaleDispatch: typeof changeLocale;
  availableLanguages: TLang[];
  currentLanguage: TLang;
}

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
const mapState = ({
  modules,
  auth,
  i18n,
}: Pick<IProps, 'auth' | 'modules' | 'i18n'>) => ({
  modules,
  isAuth: auth?.isAuth ?? false,
  availableLanguages: i18n.available,
  currentLanguage: i18n.active,
});
const mapDispatch = {
  importModuleDispatch: importModule,
  activateModuleDispatch: activateModule,
  changeLocaleDispatch: changeLocale,
};
const tryCatchFnRun = (fn: unknown): void => {
  if (fn && typeof fn === 'function') {
    try {
      fn(store);
    } catch (e) {
      logger.error(E_CODE.E_1, e);
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
    availableLanguages,
    activateModuleDispatch,
    currentLanguage,
    changeLocaleDispatch,
  }: Omit<IProps, 'auth' | 'i18n'>) => {
    const {pathname} = useLocation();
    // This is neccessary to reload a page when new language file loaded and added.
    const [refreshIndex, setRefreshIndex] = useState(0);
    const {imported, active, paths} = modules;
    const languages = availableLanguages.map((name) => ({
      title: name.split('_')[0].toUpperCase(),
      name,
    }));
    const handleChangeLanguage = (
      language: TLang,
    ): ReturnType<typeof changeLocaleDispatch> =>
      changeLocaleDispatch(language);

    const RenderLayout: FC<
      Pick<Platform.IRoute, 'layout' | 'Icon' | 'children'>
    > = ({layout, Icon = null, children}) => {
      if (layout === 'Auth') {
        return (
          <AuthLayout
            availableLanguages={languages}
            onChangeLanguage={handleChangeLanguage}
            currentLanguage={currentLanguage}
            // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
            Icon={Icon}>
            {children}
          </AuthLayout>
        );
      }

      return (
        <WithSidebarLayout
          availableLanguages={languages}
          onChangeLanguage={handleChangeLanguage}
          currentLanguage={currentLanguage}
          Menu={MainMenu}>
          {children}
        </WithSidebarLayout>
      );
    };

    // Load root translation.
    useEffect((): void => {
      // eslint-disable-next-line promise/catch-or-return
      Promise.allSettled(
        availableLanguages.map(
          (lang: string): ReturnType<typeof loadJsonFile> =>
            loadJsonFile(`/i18n/root/${lang}.json`),
        ),
      )
        .then((resources) =>
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          resources.forEach(({status, value}, index) => {
            if (status === 'fulfilled') {
              i18next.addResourceBundle(
                availableLanguages[index],
                'root',
                value,
              );
            } else {
              logger.error(
                E_CODE.E_1,
                `Can not load ${availableLanguages[index]} language`,
              );
            }
          }),
        )
        .catch((e: Error) => logger.error(E_CODE.E_1, e))
        .finally(() => setRefreshIndex(refreshIndex + 1));
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // eslint-disable-next-line sonarjs/cognitive-complexity
    useEffect((): void => {
      const found = paths.find(({path}) => path === pathname);
      const shortName = found ? found.shortName : '';

      // Attaching reducers on demand and run bootstrap function for module if exists
      if (shortName && !imported.includes(shortName)) {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        const reducer = routes[`${shortName}Reducer`] as Reducer;
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        const bootstrap = routes[`${shortName}Bootstrap`] as () => void;

        // Add i18n for loaded module.
        // eslint-disable-next-line promise/catch-or-return
        Promise.allSettled(
          availableLanguages.map(
            (lang: string): ReturnType<typeof loadJsonFile> =>
              loadJsonFile(`/i18n/${shortName}/${lang}.json`),
          ),
        )
          .then((resources) =>
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            resources.forEach(({status, value}, index) => {
              if (status === 'fulfilled') {
                i18next.addResourceBundle(
                  availableLanguages[index],
                  shortName,
                  value,
                );
              } else {
                logger.error(
                  E_CODE.E_1,
                  `Can not load ${availableLanguages[index]} language`,
                );
              }
            }),
          )
          .catch((e: Error) => logger.error(E_CODE.E_1, e))
          .finally(() => setRefreshIndex(refreshIndex + 1000));

        if (reducer && typeof reducer === 'function') {
          try {
            injectReducer(shortName, reducer);
          } catch (e) {
            logger.error(E_CODE.E_1, e);
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
            onlyForNotAuth,
            Icon,
            layout = 'WithSidebar',
          }: Platform.IRoute) => (
            <Route
              element={
                // eslint-disable-next-line no-nested-ternary
                isPrivate && !isAuth ? (
                  <Navigate to={ROUTE_LOGIN} replace />
                ) : isAuth && onlyForNotAuth ? (
                  <Navigate to={ROUTE_HOME} replace />
                ) : (
                  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
                  <RenderLayout Icon={Icon} layout={layout}>
                    <Page Link={Link} useNavigate={useNavigate} />
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
