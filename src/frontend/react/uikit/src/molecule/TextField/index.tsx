import * as React from 'react';
import {TextField as MUITextField, TextFieldProps} from '@material-ui/core';

export const TextField = (props: TextFieldProps): ReturnType<typeof MUITextField> => (
  <MUITextField {...props} />
);
