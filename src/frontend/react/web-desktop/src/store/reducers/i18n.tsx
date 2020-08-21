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
  active: EN,
  available: [EN, RU],
};
const reducers = {
  changeLocale: {
    reducer: (state: Ii18nState, action: PayloadAction<'RU' | 'EN'>) => {
      state.active = action.payload;
    },
  },
};

export const i18nSlice = createSlice({
  name,
  initialState,
  reducers,
});
