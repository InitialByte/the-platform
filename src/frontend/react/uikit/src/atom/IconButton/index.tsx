import * as React from 'react';
import {IconButton as MUIIconButton, IconButtonProps} from '@material-ui/core';

export const IconButton = (
  props: IconButtonProps,
): ReturnType<typeof MUIIconButton> => <MUIIconButton {...props} />;
