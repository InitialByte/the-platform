import * as React from 'react';
import {ListItem as MUIListItem, ListItemProps} from '@material-ui/core';

interface IFixProps extends ListItemProps {
  // eslint-disable-next-line react/require-default-props
  button?: boolean;
}

export const ListItem = (
  props: IFixProps,
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
): ReturnType<typeof MUIListItem> => <MUIListItem {...props} />;
