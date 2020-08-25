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
    reducer: (state: IAuthState, action: PayloadAction<string>) => {
      state.isAuth = true;
      state.fullName = action.payload;
    },
  },
};

export const authSlice = createSlice({
  name,
  initialState,
  reducers,
});

export const {login} = authSlice.actions;
export const {reducer} = authSlice;
