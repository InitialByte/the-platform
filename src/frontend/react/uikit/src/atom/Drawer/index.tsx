import * as React from 'react';
import {Drawer as MUIDrawer, DrawerProps} from '@material-ui/core';

export const Drawer = (props: DrawerProps): ReturnType<typeof MUIDrawer> => (
  <MUIDrawer {...props} />
);
