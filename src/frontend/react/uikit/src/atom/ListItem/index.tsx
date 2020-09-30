import * as React from 'react';
import {ListItem as MUIListItem, ListItemProps} from '@material-ui/core';

export const ListItem = (
  props: ListItemProps,
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
): ReturnType<typeof MUIListItem> => <MUIListItem {...props} />;
