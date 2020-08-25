import {createSlice, PayloadAction} from '@reduxjs/toolkit';

export const RU = 'RU';
export const EN = 'EN';
export const DEFAULT_LANG = EN;

interface Ii18nState {
  active: 'RU' | 'EN';
  available: Array<string>;
}

const name = 'platform_i18n';
const initialState: Ii18nState = {
  active: window?.__INITIAL_STATE__?.i18n?.default ?? 'EN',
  available: window?.__INITIAL_STATE__?.i18n?.available ?? [EN, RU],
};
const reducers = {
  changeLocale: {
    reducer: (state: Ii18nState, action: PayloadAction<'RU' | 'EN'>) => {
      if (state.active !== action.payload) {
        state.active = action.payload;
      }
    },
  },
};

const i18nSlice = createSlice({
  name,
  initialState,
  reducers,
});

export const {changeLocale} = i18nSlice.actions;
export const i18nReducer = i18nSlice.reducer;
