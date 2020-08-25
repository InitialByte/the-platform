import {configureStore} from '@reduxjs/toolkit';
import {
  envReducer,
  i18nReducer,
  moduleReducer,
  moduleRoutes as mroutes,
} from './reducers';

export const store = configureStore({
  reducer: {
    env: envReducer,
    i18n: i18nReducer,
    modules: moduleReducer,
  },
  devTools: window?.__INITIAL_STATE__?.env?.mode === 'development' ?? false,
});

export type AppDispatch = typeof store.dispatch;
export const moduleRoutes = mroutes;
