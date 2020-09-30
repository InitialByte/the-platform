import * as React from 'react';
import {MenuItem as MUIMenuItem, MenuItemProps} from '@material-ui/core';

export const MenuItem = (
  props: MenuItemProps,
): ReturnType<typeof MUIMenuItem> => <MUIMenuItem {...props} />;
