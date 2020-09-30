import {IEnvState, IModuleState, Ii18nState} from './store/reducers';

// DON'T FORGET TO ADD THE SAME VALUES FROM E_TYPE AND E_CODE
// INTO <root>/src/frontend/@types/global-errors.d.ts

// eslint-disable-next-line @typescript-eslint/naming-convention
enum E_TYPE {
  CRITICAL = 'CRITICAL',
  WARNING = 'WARNING',
  NOTICE = 'NOTICE',
  USER = 'USER',
  UNKNOWN = 'UNKNOWN'
}

// eslint-disable-next-line @typescript-eslint/naming-convention
enum E_CODE {
  E_1 = 1,
  E_100 = 100,
  E_101 = 101,
  E_102 = 102
}

window.E_TYPE = E_TYPE;
window.E_CODE = E_CODE;

// eslint-disable-next-line @typescript-eslint/no-unused-vars
declare global {
  interface Window {
    E_CODE: typeof E_CODE;
    E_TYPE: typeof E_TYPE;
    __INITIAL_STATE__: {
      modules: IModuleState,
      i18n: Ii18nState,
      env: IEnvState,
    };
  }
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
declare interface PromiseConstructor {
  allSettled(
    promises: Array<Promise<unknown>>,
  ): Promise<
    Array<{status: 'fulfilled' | 'rejected', value?: unknown, reason?: unknown, }>
  >;
}
