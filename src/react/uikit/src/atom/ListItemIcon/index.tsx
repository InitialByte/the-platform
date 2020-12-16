import {
  ListItemIcon as MUIListItemIcon,
  ListItemIconProps,
} from '@material-ui/core';

export const ListItemIcon = (
  props: ListItemIconProps,
): ReturnType<typeof MUIListItemIcon> => <MUIListItemIcon {...props} />;
