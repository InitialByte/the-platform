import * as React from 'react';
import {List as MUIList, ListProps} from '@material-ui/core';

export const List = (props: ListProps): ReturnType<typeof MUIList> => (
  <MUIList {...props} />
);
