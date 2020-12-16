import {Alert as MUIAlert, AlertProps} from '@material-ui/core';

export const Alert = (props: AlertProps): ReturnType<typeof MUIAlert> => (
  <MUIAlert {...props} />
);
