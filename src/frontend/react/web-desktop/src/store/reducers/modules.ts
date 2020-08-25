import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {logger, groupBy, kindOf} from '@the_platform/core';

import * as routes from '@the_platform/routes';

export const moduleRoutes = Object.values(routes as Platform.IRoute[])
  .flat()
  .filter(({path}) => Boolean(path));
const paths = moduleRoutes.map(({path}) => path);
const duplicateRoutes = paths.filter(
  (item, index) => paths.indexOf(item) !== index,
);

if (duplicateRoutes.length) {
  logger.error(E_CODE.E_102, duplicateRoutes);
}

interface IModuleState {
  active: string | null;
  available: Array<string>;
  imported: Array<string>;
  pathsGrouped: any;
  paths: any;
}

const name = 'platform_modules';
const pathsNonGrouped = moduleRoutes.map(({path, shortName}) => ({
  path,
  shortName,
}));
const initialState: IModuleState = {
  active: null,
  available: window?.__INITIAL_STATE__?.modules?.available ?? [],
  paths: pathsNonGrouped,
  pathsGrouped: groupBy(pathsNonGrouped, 'shortName'),
  imported: [],
};
const reducers = {
  importModule: {
    reducer: (state: IModuleState, {payload}: PayloadAction<string>) => {
      if (!state.imported.includes(payload)) {
        state.imported.push(payload);
      }
    },
  },
  activateModule: {
    reducer: (state: IModuleState, {payload}: PayloadAction<string>) => {
      if (payload !== state.active) {
        state.active = payload;
      }
    },
  },
};

const moduleSlice = createSlice({
  name,
  initialState,
  reducers,
});

export const {importModule, activateModule} = moduleSlice.actions;
export const moduleReducer = moduleSlice.reducer;