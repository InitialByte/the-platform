import {Box as MUIBox, BoxProps} from '@material-ui/core';

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
export const Box = (props: BoxProps): ReturnType<typeof MUIBox> => (
  <MUIBox {...props} />
);
