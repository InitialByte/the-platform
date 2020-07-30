import * as React from 'react';
import {Paper as MUIPaper} from '@material-ui/core';

export const Paper = (props: any): ReturnType<typeof MUIPaper> => (
  <MUIPaper {...props} />
);
