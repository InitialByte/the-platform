import {createSlice, PayloadAction, createAsyncThunk} from '@reduxjs/toolkit';
import {signIn, signOut} from '../provider';

type TRequestStatuses = 'idle' | 'pending';

interface IResponseError {
  name: string;
  message: string;
  stack: string;
}

interface IResponseMeta {
  requestId: string;
}

interface IAuthState {
  isAuth: boolean;
  requests: {
    signin: TRequestStatuses,
    signout: TRequestStatuses,
  };
  fullName?: string;
  lastError?: IResponseError;
  currentRequestId?: string;
}

interface IAuthData {
  fullName: string;
}

interface IPayload {
  email: string;
  password: string;
}

export const fetchLogin = createAsyncThunk(
  'auth/signin',
  async (payload: IPayload, thunkApi) => {
    const {currentRequestId, requests} = thunkApi.getState().auth as IAuthState;
    if (
      requests.signin !== 'pending' ||
      thunkApi.requestId !== currentRequestId
    ) {
      return;
    }
    const response = await signIn(payload);
    // eslint-disable-next-line consistent-return
    return (await response.json()) as IAuthData;
  },
);

export const fetchLogout = createAsyncThunk('auth/signout', async () => {
  // eslint-disable-next-line sonarjs/prefer-immediate-return
  const response = await signOut();
  return response;
});

const name = 'module_auth';
const initialState: IAuthState = {
  isAuth: false,
  requests: {
    signin: 'idle',
    signout: 'idle',
  },
};
const reducers = {};
const extraReducers = {
  [fetchLogin.pending.toString()]: (
    state: IAuthState,
    action: PayloadAction<IAuthData, string, IResponseMeta, IResponseError>,
  ) => {
    if (state.requests.signin === 'idle') {
      state.requests.signin = 'pending';
      state.currentRequestId = action.meta.requestId;
    }
  },
  [fetchLogin.fulfilled.toString()]: (
    state: IAuthState,
    action: PayloadAction<IAuthData>,
  ) => {
    state.isAuth = true;
    state.fullName = action.payload.fullName;
    state.requests.signin = 'idle';
  },
  [fetchLogin.rejected.toString()]: (
    state: IAuthState,
    action: PayloadAction<IAuthData, string, IResponseMeta, IResponseError>,
  ) => {
    if (state.requests.signin === 'pending') {
      state.requests.signin = 'idle';
      state.lastError = action.error;
    }
  },
  [fetchLogout.pending.toString()]: (state: IAuthState) => {
    if (state.requests.signout === 'idle') {
      state.requests.signout = 'pending';
    }
  },
  [fetchLogout.fulfilled.toString()]: (state: IAuthState) => {
    state.isAuth = false;
    state.fullName = undefined;
    state.requests.signout = 'idle';
  },
  [fetchLogout.rejected.toString()]: (
    state: IAuthState,
    action: PayloadAction<string, string, IResponseMeta, IResponseError>,
  ) => {
    if (state.requests.signout === 'pending') {
      state.requests.signout = 'idle';
      state.lastError = action.error;
    }
  },
};

export const authSlice = createSlice({
  name,
  initialState,
  reducers,
  extraReducers,
});

export const {reducer} = authSlice;
