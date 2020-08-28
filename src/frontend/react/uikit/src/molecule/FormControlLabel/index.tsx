import * as React from 'react';
import {
  FormControlLabel as MUIFormControlLabel,
  FormControlLabelProps,
} from '@material-ui/core';

export const FormControlLabel = (
  props: FormControlLabelProps,
): ReturnType<typeof MUIFormControlLabel> => <MUIFormControlLabel {...props} />;
