import * as React from 'react';
import {default as MUIAlert} from '@material-ui/lab/Alert';

export const Alert = (props: any): ReturnType<typeof MUIAlert> => (
  <MUIAlert {...props} />
);
