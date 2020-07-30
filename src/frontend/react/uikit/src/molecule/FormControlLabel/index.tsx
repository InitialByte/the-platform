import * as React from 'react';
import {FormControlLabel as MUIFormControlLabel} from '@material-ui/core';

export const FormControlLabel = (
  props: any,
): ReturnType<typeof MUIFormControlLabel> => <MUIFormControlLabel {...props} />;
