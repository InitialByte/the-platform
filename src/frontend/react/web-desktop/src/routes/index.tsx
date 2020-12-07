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
import {CSSNamer} from '@the_platform/core';
import {AppContainer} from '../containers/App';
import {Notification} from '../components';

interface IProps {
  modulesRoute: Platform.IRoute[];
}

const isProduction = window?.__INITIAL_STATE__?.env?.mode === 'production';

const generateClassName = (): any => {
  const names = [];
  const cssNamer = new CSSNamer();
  let ruleCounter = 0;
  const maxCounterNumber = 1e10;
  const hashCode = (s: string): string => {
    let h;
    for (let i = 0; i < s.length; i += 1) {
      h = (Math.imul(31, h) + s.charCodeAt(i)) | 0;
    }

    return h;
  };

  const getNextCounterId = (): number => {
    ruleCounter += 1;
    if (ruleCounter >= maxCounterNumber) {
      console.warn(
        'You might have a memory leak. The ruleCounter is not supposed to grow that much.',
      );
    }

    return ruleCounter;
  };

  return (rule, styleSheet) => {
    const {classNamePrefix} = styleSheet?.options ?? {};
    const {key = ''} = rule;
    const suffix = `${key}-${getNextCounterId()}`;

    if (isProduction) {
      const hash = hashCode(suffix);

      if (!names[hash]) {
        names[hash] = cssNamer.getName(hash);
      }

      return names[hash];
    }

    if (classNamePrefix) {
      return `${classNamePrefix.replace('Mui', '')}-${suffix}`;
    }

    return suffix;
  };
};

export const AppRouter = ({modulesRoute = []}: IProps): JSX.Element => (
  <ErrorBoundary>
    <StrictMode>
      <GAG path={isProduction ? '/gap.js' : '/stub.js'} id="1" />
      <YAM
        path={isProduction ? '/yap.js' : '/stub.js'}
        accounts={[1]}
        options={{
          defer: true,
          webvisor: true,
        }}
        version="1"
      />
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
