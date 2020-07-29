import * as React from 'react';
import {Button as MUIButton} from '@material-ui/core';

export const Button = (props: any): ReturnType<typeof MUIButton> => (
  <MUIButton {...props} />
);
