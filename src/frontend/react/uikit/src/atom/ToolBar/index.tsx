import * as React from 'react';
import {Toolbar as MUIToolbar, ToolbarProps} from '@material-ui/core';

export const Toolbar = (props: ToolbarProps): ReturnType<typeof MUIToolbar> => (
  <MUIToolbar {...props} />
);
