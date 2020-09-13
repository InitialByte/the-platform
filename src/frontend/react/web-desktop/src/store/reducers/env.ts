import {createSlice} from '@reduxjs/toolkit';

export interface IEnvState {
  mode: string;
  workspace: string;
}

const name = 'platform_env';
const defaultState: IEnvState = {
  mode: 'production',
  workspace: 'client',
};
// eslint-disable-next-line no-underscore-dangle
const initialState: IEnvState = window?.__INITIAL_STATE__?.env ?? defaultState;
const reducers = {};

const envSlice = createSlice({
  initialState,
  reducers,
  name,
});

export const envReducer = envSlice.reducer;
