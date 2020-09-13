import * as React from 'react';
import {Box as MUIBox, BoxProps} from '@material-ui/core';

export const Box = (props: BoxProps): ReturnType<typeof MUIBox> => (
  <MUIBox {...props} />
);
