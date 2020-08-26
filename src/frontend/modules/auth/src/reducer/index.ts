import {createSlice, PayloadAction, createAsyncThunk} from '@reduxjs/toolkit';
import {signIn, signOut} from '../provider';

interface IAuthState {
  isAuth: boolean;
  fullName?: string;
}

const fetchLogin = createAsyncThunk('auth/signin', async (payload) => {
  const response = await signIn(payload);
  return response.data;
});

const name = 'module_auth';
const initialState: IAuthState = {
  isAuth: false,
};
const reducers = {
  login: {
    reducer: (state: IAuthState, action: PayloadAction<string>): void => {
      state.isAuth = true;
      state.fullName = action.payload;
    },
  },
  logout: {
    reducer: (state: IAuthState): void => {
      state.isAuth = false;
      state.fullName = undefined;
    },
  },
};
const extraReducers = {
  [fetchLogin.fulfilled]: (
    state: IAuthState,
    action: PayloadAction<string>,
  ) => {
    state.isAuth = true;
    state.fullName = action.payload;
  },
};

export const authSlice = createSlice({
  name,
  initialState,
  reducers,
  extraReducers,
});

export const {login, logout} = authSlice.actions;
export const {reducer} = authSlice;
