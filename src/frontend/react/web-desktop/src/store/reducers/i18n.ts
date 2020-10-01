import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {i18next, logger} from '@the_platform/core';

export type TLang = 'ru_ru' | 'en_us';

export interface Ii18nState {
  active: TLang;
  available: TLang[];
  default?: TLang;
}

export const RU = 'ru_ru';
export const EN = 'en_us';
export const DEFAULT_LANG: TLang = EN;

const name = 'platform_i18n';
const initialState: Ii18nState = {
  // eslint-disable-next-line no-underscore-dangle
  active: window?.__INITIAL_STATE__?.i18n?.default ?? EN,
  // eslint-disable-next-line no-underscore-dangle
  available: window?.__INITIAL_STATE__?.i18n?.available ?? [EN, RU],
};
const reducers = {
  changeLocale: {
    reducer: (state: Ii18nState, {payload}: PayloadAction<TLang>): void => {
      if (state.active !== payload && state.available.includes(payload)) {
        i18next
          .changeLanguage(payload)
          .catch((e: Error) => logger.error(E_CODE.E_1, e));
        state.active = payload;
      }
    },
  },
};

const i18nSlice = createSlice({
  initialState,
  reducers,
  name,
});

export const {changeLocale} = i18nSlice.actions;
export const i18nReducer = i18nSlice.reducer;
