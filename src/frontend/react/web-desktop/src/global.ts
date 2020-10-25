import {IEnvState, IModuleState, Ii18nState} from './store/reducers';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
declare global {
  interface Window {
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
