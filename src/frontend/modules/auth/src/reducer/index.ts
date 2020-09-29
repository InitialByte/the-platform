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
    recoveryPassword: REQUEST_STATUS;
    updatePassword: REQUEST_STATUS;
    register: REQUEST_STATUS;
    signout: REQUEST_STATUS;
    signin: REQUEST_STATUS;
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

const createAsync = (
  requestType:
    | 'recoveryPassword'
    | 'updatePassword'
    | 'register'
    | 'signout'
    | 'signin',
  serverMethod: any,
) => async (payload: IPayload, thunkApi: any) => {
  const {currentRequestId, requests} = thunkApi.getState().auth as IAuthState;

  if (
    requests[requestType] !== REQUEST_STATUS.PENDING ||
    thunkApi.requestId !== currentRequestId
  ) {
    return;
  }

  const response = await serverMethod(payload);

  // eslint-disable-next-line consistent-return
  return (await response.json()) as IAuthData;
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
    recoveryPassword: REQUEST_STATUS.IDLE,
    updatePassword: REQUEST_STATUS.IDLE,
    register: REQUEST_STATUS.IDLE,
    signout: REQUEST_STATUS.IDLE,
    signin: REQUEST_STATUS.IDLE,
  },
};
const reducers = {};
const extraReducers = {
  [fetchLogin.pending.toString()]: (
    state: IAuthState,
    action: PayloadAction<IAuthData, string, IResponseMeta, IResponseError>,
  ) => {
    if (state.requests.signin === REQUEST_STATUS.IDLE) {
      state.requests.signin = REQUEST_STATUS.PENDING;
      state.currentRequestId = action.meta.requestId;
    }
  },
  [fetchLogin.fulfilled.toString()]: (
    state: IAuthState,
    action: PayloadAction<IAuthData>,
  ) => {
    state.isAuth = true;
    state.fullName = action.payload.fullName;
    state.requests.signin = REQUEST_STATUS.IDLE;
  },
  [fetchLogin.rejected.toString()]: (
    state: IAuthState,
    action: PayloadAction<IAuthData, string, IResponseMeta, IResponseError>,
  ) => {
    if (state.requests.signin === REQUEST_STATUS.PENDING) {
      state.requests.signin = REQUEST_STATUS.IDLE;
      state.lastError = action.error;
    }
  },

  [fetchLogout.pending.toString()]: (state: IAuthState) => {
    if (state.requests.signout === REQUEST_STATUS.IDLE) {
      state.requests.signout = REQUEST_STATUS.PENDING;
    }
  },
  [fetchLogout.fulfilled.toString()]: (state: IAuthState) => {
    state.isAuth = false;
    state.fullName = undefined;
    state.requests.signout = REQUEST_STATUS.IDLE;
  },
  [fetchLogout.rejected.toString()]: (
    state: IAuthState,
    action: PayloadAction<string, string, IResponseMeta, IResponseError>,
  ) => {
    if (state.requests.signout === REQUEST_STATUS.PENDING) {
      state.requests.signout = REQUEST_STATUS.IDLE;
      state.lastError = action.error;
    }
  },

  [fetchRecoveryPassword.pending.toString()]: (
    state: IAuthState,
    action: PayloadAction<IAuthData, string, IResponseMeta, IResponseError>,
  ) => {
    if (state.requests.recoveryPassword === REQUEST_STATUS.IDLE) {
      state.requests.recoveryPassword = REQUEST_STATUS.PENDING;
      state.currentRequestId = action.meta.requestId;
    }
  },
  [fetchRecoveryPassword.fulfilled.toString()]: (state: IAuthState) => {
    state.requests.recoveryPassword = REQUEST_STATUS.IDLE;
  },
  [fetchRecoveryPassword.rejected.toString()]: (
    state: IAuthState,
    action: PayloadAction<IAuthData, string, IResponseMeta, IResponseError>,
  ) => {
    if (state.requests.recoveryPassword === REQUEST_STATUS.PENDING) {
      state.requests.recoveryPassword = REQUEST_STATUS.IDLE;
      state.lastError = action.error;
    }
  },

  [fetchUpdatePassword.pending.toString()]: (
    state: IAuthState,
    action: PayloadAction<IAuthData, string, IResponseMeta, IResponseError>,
  ) => {
    if (state.requests.updatePassword === REQUEST_STATUS.IDLE) {
      state.requests.updatePassword = REQUEST_STATUS.PENDING;
      state.currentRequestId = action.meta.requestId;
    }
  },
  [fetchUpdatePassword.fulfilled.toString()]: (state: IAuthState) => {
    state.requests.updatePassword = REQUEST_STATUS.IDLE;
  },
  [fetchUpdatePassword.rejected.toString()]: (
    state: IAuthState,
    action: PayloadAction<IAuthData, string, IResponseMeta, IResponseError>,
  ) => {
    if (state.requests.updatePassword === REQUEST_STATUS.PENDING) {
      state.requests.updatePassword = REQUEST_STATUS.IDLE;
      state.lastError = action.error;
    }
  },

  [fetchRegister.pending.toString()]: (
    state: IAuthState,
    action: PayloadAction<IAuthData, string, IResponseMeta, IResponseError>,
  ) => {
    if (state.requests.register === REQUEST_STATUS.IDLE) {
      state.requests.updatePassword = REQUEST_STATUS.PENDING;
      state.currentRequestId = action.meta.requestId;
    }
  },
  [fetchRegister.fulfilled.toString()]: (state: IAuthState) => {
    state.requests.register = REQUEST_STATUS.IDLE;
  },
  [fetchRegister.rejected.toString()]: (
    state: IAuthState,
    action: PayloadAction<IAuthData, string, IResponseMeta, IResponseError>,
  ) => {
    if (state.requests.register === REQUEST_STATUS.PENDING) {
      state.requests.register = REQUEST_STATUS.IDLE;
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
