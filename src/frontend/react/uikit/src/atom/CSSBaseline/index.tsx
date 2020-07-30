import * as React from 'react';
import {CssBaseline as MUICssBaseline} from '@material-ui/core';

export const CSSBaseline = (props: any): ReturnType<typeof MUICssBaseline> => (
  <MUICssBaseline {...props} />
);
