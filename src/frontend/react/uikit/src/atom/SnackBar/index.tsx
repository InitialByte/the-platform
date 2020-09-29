import * as React from 'react';
import {Snackbar as MUISnackbar, SnackbarProps} from '@material-ui/core';

export const Snackbar = (
  props: SnackbarProps,
): ReturnType<typeof MUISnackbar> => <MUISnackbar {...props} />;
