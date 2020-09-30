import * as React from 'react';
import {ListItem as MUIListItem, ListItemProps} from '@material-ui/core';

export const ListItem = (
  props: ListItemProps,
): ReturnType<typeof MUIListItem> => <MUIListItem {...props} />;
