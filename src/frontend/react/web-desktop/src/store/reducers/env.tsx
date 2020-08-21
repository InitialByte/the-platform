import {createSlice} from '@reduxjs/toolkit';

interface IEnvState {
  mode: string;
}

const name = 'platform_env';
const initialState: IEnvState = {
  mode: 'development',
};
const reducers = {};

export const envSlice = createSlice({
  name,
  initialState,
  reducers,
});
