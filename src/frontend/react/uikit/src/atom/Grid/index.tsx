import * as React from 'react';
import {Grid as MUIGrid} from '@material-ui/core';

export const Grid = (props: any): ReturnType<typeof MUIGrid> => (
  <MUIGrid {...props} />
);
