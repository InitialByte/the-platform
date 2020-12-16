import {Button as MUIButton, ButtonProps} from '@material-ui/core';

export const Button = (props: ButtonProps): ReturnType<typeof MUIButton> => (
  <MUIButton {...props} />
);
