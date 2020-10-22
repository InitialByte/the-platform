import {Typography as MUITypography, TypographyProps} from '@material-ui/core';

export const Typography = (
  props: TypographyProps,
): ReturnType<typeof MUITypography> => <MUITypography {...props} />;
