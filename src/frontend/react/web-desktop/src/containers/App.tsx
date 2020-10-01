import * as React from 'react';
import {useEffect, useState, FC} from 'react';
import {Reducer} from 'redux';
import {useLocation} from 'react-router-dom';
import {connect} from 'react-redux';
import {Routes, Route, Navigate} from 'react-router-dom';
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

interface IMapStateProps {
  modules: IModuleState;
  isAuth: boolean;
  availableLanguages: TLang[];
  currentLanguage: TLang;
}

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

const mapState = ({
  modules,
  auth,
  i18n,
}: Pick<IProps, 'auth' | 'modules' | 'i18n'>): IMapStateProps => ({
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
  }: Omit<IProps, 'auth' | 'i18n'>): JSX.Element => {
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

    const RenderLayout: FC<Pick<
      Platform.IRoute,
      'layout' | 'title' | 'Icon' | 'children'
    >> = ({layout, title, Icon = null, children}) => {
      if (layout === 'Auth') {
        return (
          <AuthLayout
            availableLanguages={languages}
            onChangeLanguage={handleChangeLanguage}
            currentLanguage={currentLanguage}
            // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
            Icon={Icon}
            title={title}>
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
            resources.forEach(({status, value}, index: number): void => {
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
          .finally(() => setRefreshIndex(refreshIndex + 1));

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
            title = 'Empty title',
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
                  <RenderLayout Icon={Icon} title={title} layout={layout}>
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
