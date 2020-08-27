import * as React from 'react';
import {default as MUIAlert, AlertProps} from '@material-ui/lab/Alert';

export const Alert = (props: AlertProps): ReturnType<typeof MUIAlert> => (
  <MUIAlert {...props} />
);
