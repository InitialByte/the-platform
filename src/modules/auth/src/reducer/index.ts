/* eslint-disable */
// @ts-nocheck

import {createSlice, PayloadAction, createAsyncThunk} from '@reduxjs/toolkit';
import {
  signIn,
  updatePassword,
  recoveryPassword,
  signOut,
  register,
} from '../provider';

enum REQUEST_STATUS {
  IDLE = 'idle',
  PENDING = 'pending',
}

interface IRequest {
  status: REQUEST_STATUS;
  lastError?: IResponseError;
  lastRequestId?: string;
}

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
    recoveryPassword: IRequest;
    updatePassword: IRequest;
    register: IRequest;
    signout: IRequest;
    signin: IRequest;
  };
  fullName?: string;
}

interface IAuthData {
  fullName: string;
}

const createAsync = (
  requestType:
    | 'recoveryPassword'
    | 'updatePassword'
    | 'register'
    | 'signout'
    | 'signin',
  serverMethod: <T>(payload: T) => Promise<Response>,
) => async (payload: unknown, thunkApi: any) => {
  const {requests} = thunkApi.getState().auth as IAuthState;

  if (
    requests[requestType].status !== REQUEST_STATUS.PENDING ||
    requests[requestType].lastRequestId !== thunkApi.requestId
  ) {
    return;
  }

  const response = await serverMethod(payload);
  return response;
};

export const fetchLogin = createAsyncThunk(
  'auth/signin',
  createAsync('signin', signIn),
);

export const fetchRecoveryPassword = createAsyncThunk(
  'auth/recoverypassword',
  createAsync('recoveryPassword', recoveryPassword),
);

export const fetchUpdatePassword = createAsyncThunk(
  'auth/updatepassword',
  createAsync('updatePassword', updatePassword),
);

export const fetchRegister = createAsyncThunk(
  'auth/register',
  createAsync('register', register),
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
    recoveryPassword: {
      status: REQUEST_STATUS.IDLE,
    },
    updatePassword: {
      status: REQUEST_STATUS.IDLE,
    },
    register: {
      status: REQUEST_STATUS.IDLE,
    },
    signout: {
      status: REQUEST_STATUS.IDLE,
    },
    signin: {
      status: REQUEST_STATUS.IDLE,
    },
  },
};
const reducers = {
  simpleAuth: (
    state: INotificationState,
    {payload}: PayloadAction<IAuthData>,
  ): void => {
    state.isAuth = true;
    state.fullName = payload?.fullName ?? '';
  },
};

const extraReducers = {
  [fetchLogin.pending.toString()]: (
    state: IAuthState,
    action: PayloadAction<IAuthData, string, IResponseMeta, IResponseError>,
  ) => {
    if (state.requests.signin.status === REQUEST_STATUS.IDLE) {
      state.requests.signin.status = REQUEST_STATUS.PENDING;
      state.requests.signin.lastRequestId = action.meta.requestId;
    }
  },
  [fetchLogin.fulfilled.toString()]: (
    state: IAuthState,
    action: PayloadAction<IAuthData>,
  ) => {
    state.isAuth = true;
    state.fullName = action?.payload?.fullName ?? '';
    state.requests.signin.status = REQUEST_STATUS.IDLE;
  },
  [fetchLogin.rejected.toString()]: (
    state: IAuthState,
    action: PayloadAction<IAuthData, string, IResponseMeta, IResponseError>,
  ) => {
    if (state.requests.signin.status === REQUEST_STATUS.PENDING) {
      state.requests.signin.status = REQUEST_STATUS.IDLE;
      state.requests.signin.lastError = action.error;
    }
  },

  [fetchLogout.pending.toString()]: (state: IAuthState) => {
    if (state.requests.signout.status === REQUEST_STATUS.IDLE) {
      state.requests.signout.status = REQUEST_STATUS.PENDING;
    }
  },
  [fetchLogout.fulfilled.toString()]: (state: IAuthState) => {
    state.isAuth = false;
    state.fullName = undefined;
    state.requests.signout.status = REQUEST_STATUS.IDLE;
  },
  [fetchLogout.rejected.toString()]: (
    state: IAuthState,
    action: PayloadAction<string, string, IResponseMeta, IResponseError>,
  ) => {
    if (state.requests.signout.status === REQUEST_STATUS.PENDING) {
      state.requests.signout.status = REQUEST_STATUS.IDLE;
      state.requests.signout.lastError = action.error;
    }
  },

  [fetchRecoveryPassword.pending.toString()]: (
    state: IAuthState,
    action: PayloadAction<IAuthData, string, IResponseMeta, IResponseError>,
  ) => {
    if (state.requests.recoveryPassword.status === REQUEST_STATUS.IDLE) {
      state.requests.recoveryPassword.status = REQUEST_STATUS.PENDING;
      state.requests.recoveryPassword.lastRequestId = action.meta.requestId;
    }
  },
  [fetchRecoveryPassword.fulfilled.toString()]: (state: IAuthState) => {
    state.requests.recoveryPassword.status = REQUEST_STATUS.IDLE;
  },
  [fetchRecoveryPassword.rejected.toString()]: (
    state: IAuthState,
    action: PayloadAction<IAuthData, string, IResponseMeta, IResponseError>,
  ) => {
    if (state.requests.recoveryPassword.status === REQUEST_STATUS.PENDING) {
      state.requests.recoveryPassword.status = REQUEST_STATUS.IDLE;
      state.requests.recoveryPassword.lastError = action.error;
    }
  },

  [fetchUpdatePassword.pending.toString()]: (
    state: IAuthState,
    action: PayloadAction<IAuthData, string, IResponseMeta, IResponseError>,
  ) => {
    if (state.requests.updatePassword.status === REQUEST_STATUS.IDLE) {
      state.requests.updatePassword.status = REQUEST_STATUS.PENDING;
      state.requests.updatePassword.lastRequestId = action.meta.requestId;
    }
  },
  [fetchUpdatePassword.fulfilled.toString()]: (state: IAuthState) => {
    state.requests.updatePassword.status = REQUEST_STATUS.IDLE;
  },
  [fetchUpdatePassword.rejected.toString()]: (
    state: IAuthState,
    action: PayloadAction<IAuthData, string, IResponseMeta, IResponseError>,
  ) => {
    if (state.requests.updatePassword.status === REQUEST_STATUS.PENDING) {
      state.requests.updatePassword.status = REQUEST_STATUS.IDLE;
      state.requests.updatePassword.lastError = action.error;
    }
  },

  [fetchRegister.pending.toString()]: (
    state: IAuthState,
    action: PayloadAction<IAuthData, string, IResponseMeta, IResponseError>,
  ) => {
    if (state.requests.register.status === REQUEST_STATUS.IDLE) {
      state.requests.register.status = REQUEST_STATUS.PENDING;
      state.requests.register.lastRequestId = action.meta.requestId;
    }
  },
  [fetchRegister.fulfilled.toString()]: (state: IAuthState) => {
    state.requests.register.status = REQUEST_STATUS.IDLE;
  },
  [fetchRegister.rejected.toString()]: (
    state: IAuthState,
    action: PayloadAction<IAuthData, string, IResponseMeta, IResponseError>,
  ) => {
    if (state.requests.register.status === REQUEST_STATUS.PENDING) {
      state.requests.register.status = REQUEST_STATUS.IDLE;
      state.requests.register.lastError = action.error;
    }
  },
};

export const authSlice = createSlice({
  name,
  initialState,
  reducers,
  extraReducers,
});

export const {reducer, actions} = authSlice;
