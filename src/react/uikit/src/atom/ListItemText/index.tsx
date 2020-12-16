import {
  ListItemText as MUIListItemText,
  ListItemTextProps,
} from '@material-ui/core';

export const ListItemText = (
  props: ListItemTextProps,
): ReturnType<typeof MUIListItemText> => <MUIListItemText {...props} />;
