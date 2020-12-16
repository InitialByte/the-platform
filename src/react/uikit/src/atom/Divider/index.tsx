import {Divider as MUIDivider, DividerProps} from '@material-ui/core';

export const Divider = (props: DividerProps): ReturnType<typeof MUIDivider> => (
  <MUIDivider {...props} />
);
