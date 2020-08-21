import {createSlice, PayloadAction} from '@reduxjs/toolkit';

interface IModuleState {
  active?: string;
  available: Array<string>;
  imported?: Array<string>;
}

const name = 'platform_modules';
const initialState: IModuleState = {
  available: [],
};
const reducers = {
  importModule: {
    reducer: (state: IModuleState, action: PayloadAction<any>) => {
      state.imported.push(action.payload);
    },
  },
};

export const moduleSlice = createSlice({
  name,
  initialState,
  reducers,
});
