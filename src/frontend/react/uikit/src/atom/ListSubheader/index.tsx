import {
  ListSubheader as MUIListSubheader,
  ListSubheaderProps,
} from '@material-ui/core';

export const ListSubheader = (
  props: ListSubheaderProps,
): ReturnType<typeof MUIListSubheader> => <MUIListSubheader {...props} />;
