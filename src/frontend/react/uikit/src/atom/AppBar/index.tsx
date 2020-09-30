import * as React from 'react';
import {AppBar as MUIAppBar, AppBarProps} from '@material-ui/core';

export const Appbar = (props: AppBarProps): ReturnType<typeof MUIAppBar> => (
  <MUIAppBar {...props} />
);
