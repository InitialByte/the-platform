import * as React from 'react';
import {Link as MUILink, LinkProps} from '@material-ui/core';

export const Link = (props: LinkProps): ReturnType<typeof MUILink> => (
  <MUILink {...props} />
);
