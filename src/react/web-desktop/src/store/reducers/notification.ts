import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {setObjectCache} from '@the_platform/core';

interface IToast {
  message: string;
  type: 'error' | 'warning' | 'info' | 'success';
  position: {
    vertical: 'top' | 'bottom',
    horizontal: 'center' | 'right' | 'left',
  };
  lifeTime: number;
}

interface INotificationState {
  toasts: IToast[];
}

const DEFAULT_LIFE_TIME = 3000;
const name = 'platform_notification';
const initialState: INotificationState = {
  toasts: [],
};
const reducers = {
  createToast: (
    state: INotificationState,
    {payload}: PayloadAction<IToast>,
  ): void => {
    state.toasts.push({
      message: payload.message,
      type: payload.type,
      lifeTime: payload.lifeTime ?? DEFAULT_LIFE_TIME,
      position: {
        vertical: 'top',
        horizontal: 'right',
      },
    });
  },
};

const notificationSlice = createSlice({
  initialState,
  reducers,
  name,
});

// We need to share these actions between different modules.
setObjectCache<typeof notificationSlice.actions>(
  'notificationActions',
  notificationSlice.actions,
);

export const notificationReducer = notificationSlice.reducer;
