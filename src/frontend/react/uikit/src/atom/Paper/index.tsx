import * as React from 'react';
import {Paper as MUIPaper, PaperProps} from '@material-ui/core';

export const Paper = (props: PaperProps): ReturnType<typeof MUIPaper> => (
  <MUIPaper {...props} />
);
