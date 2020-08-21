import {configureStore} from '@reduxjs/toolkit';
import {envSlice, i18nSlice, moduleSlice} from './reducers';

// type RootState = ReturnType<typeof userReducer>;

export const store = configureStore({
  reducer: {
    env: envSlice.reducer,
    i18n: i18nSlice.reducer,
    modules: moduleSlice.reducer,
  },
});

export type AppDispatch = typeof store.dispatch;
