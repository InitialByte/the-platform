import * as React from 'react';
import {
  CssBaseline as MUICssBaseline,
  CssBaselineProps,
} from '@material-ui/core';

export const CSSBaseline = (
  props: CssBaselineProps,
): ReturnType<typeof MUICssBaseline> => <MUICssBaseline {...props} />;
