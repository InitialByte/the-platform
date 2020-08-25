import {createSlice, PayloadAction} from '@reduxjs/toolkit';

interface IAuthState {
  isAuth: boolean;
  fullName?: string;
}

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

export const authSlice = createSlice({
  name,
  initialState,
  reducers,
});

export const {login, logout} = authSlice.actions;
export const {reducer} = authSlice;
