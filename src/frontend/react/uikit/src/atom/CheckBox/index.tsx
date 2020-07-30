import * as React from 'react';
import {Checkbox as MUICheckbox} from '@material-ui/core';

export const Checkbox = (props: any): ReturnType<typeof MUICheckbox> => (
  <MUICheckbox {...props} />
);
