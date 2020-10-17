import * as React from 'react';
import {AlertTitle as MUIAlertTitle, AlertTitleProps} from '@material-ui/core';

export const AlertTitle = (
  props: AlertTitleProps,
): ReturnType<typeof MUIAlertTitle> => <MUIAlertTitle {...props} />;
