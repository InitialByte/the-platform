import {
  configureStore,
  getDefaultMiddleware,
} from '@reduxjs/toolkit';
import {combineReducers} from 'redux';
import {
  envReducer,
  i18nReducer,
  moduleReducer,
  moduleRoutes as mRoutes,
} from './reducers';

type TReducer = Object<string, ReducerFunction | ReducerAndPrepareObject>;

const asyncReducers: Record<string, any> = [];

const middleware = getDefaultMiddleware({
  immutableCheck: true,
  serializableCheck: true,
  thunk: true,
});

const reducer = {
  env: envReducer,
  i18n: i18nReducer,
  modules: moduleReducer,
};

const createReducer = (): ReturnType<typeof combineReducers> =>
  combineReducers({
    ...reducer,
    ...asyncReducers,
  });

export const store = configureStore({
  reducer,
  middleware,
  devTools: window?.__INITIAL_STATE__?.env?.mode === 'development' ?? false,
});

export const injectReducer = (key: string, injectableReducer: any): void => {
  asyncReducers.push({[key]: injectableReducer});

  if (store) {
    store.replaceReducer(createReducer());
  }
};
export const moduleRoutes = mRoutes;

export type TAppDispatch = typeof store.dispatch;
export type TRootState = ReturnType<typeof store.getState>;
