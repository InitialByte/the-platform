import {configureStore, getDefaultMiddleware} from '@reduxjs/toolkit';
import {combineReducers, Reducer} from 'redux';
import {
  envReducer,
  i18nReducer,
  moduleReducer,
  notificationReducer,
  moduleRoutes as mRoutes,
} from './reducers';

const asyncReducers: Record<string, Reducer> = {};

const middleware = getDefaultMiddleware({
  immutableCheck: true,
  serializableCheck: true,
  thunk: true,
});

const reducer = {
  env: envReducer,
  i18n: i18nReducer,
  modules: moduleReducer,
  notification: notificationReducer,
};

const createReducer = (): Reducer<ReturnType<typeof reducer>> =>
  combineReducers({
    ...reducer,
    ...asyncReducers,
  });

export const store = configureStore({
  reducer,
  middleware,
  // eslint-disable-next-line no-underscore-dangle
  devTools: window?.__INITIAL_STATE__?.env?.mode === 'development' ?? false,
});

export const injectReducer = (
  key: string,
  injectableReducer: Reducer,
): void => {
  asyncReducers[key] = injectableReducer;

  if (store) {
    store.replaceReducer(createReducer());
  }
};
export const moduleRoutes = mRoutes;

export type TAppDispatch = typeof store.dispatch;
export type TRootState = ReturnType<typeof store.getState>;
