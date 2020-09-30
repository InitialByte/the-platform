import * as React from 'react';
import {MenuItem as MUIMenuItem, MenuItemProps} from '@material-ui/core';

export const MenuItem = (
  props: MenuItemProps,
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
): ReturnType<typeof MUIMenuItem> => <MUIMenuItem {...props} />;
