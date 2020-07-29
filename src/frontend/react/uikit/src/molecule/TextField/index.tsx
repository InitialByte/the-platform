import * as React from 'react';
import {TextField as MUITextField} from '@material-ui/core';

export const TextField = (props: any): ReturnType<typeof MUITextField> => (
  <MUITextField {...props} />
);
