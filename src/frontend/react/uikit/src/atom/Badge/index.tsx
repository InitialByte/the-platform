import * as React from 'react';
import {Badge as MUIBadge, BadgeProps} from '@material-ui/core';

export const Badge = (props: BadgeProps): ReturnType<typeof MUIBadge> => (
  <MUIBadge {...props} />
);
