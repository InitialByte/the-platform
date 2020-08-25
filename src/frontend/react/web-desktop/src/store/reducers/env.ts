import {createSlice} from '@reduxjs/toolkit';

interface IEnvState {
  mode: string;
  workspace: string;
}

const name = 'platform_env';
const initialState: IEnvState = (window?.__INITIAL_STATE__
  ?.env as IEnvState) || {
  mode: 'production',
  workspace: 'client',
};
const reducers = {};

const envSlice = createSlice({
  name,
  initialState,
  reducers,
});

export const envReducer = envSlice.reducer;
