import * as React from 'react';
import {FC} from 'react';
import {Typography, Link} from '../../atom';

interface IProps {
  webAddress: string;
  siteName: string;
  showYear?: boolean;
  showCopyright?: boolean;
}

export const Copyright: FC<IProps> = ({
  webAddress,
  siteName,
  showYear = true,
  showCopyright = true,
}) => (
  <Typography variant="body2" color="textSecondary" align="center">
    {showCopyright && '© '}
    <Link color="inherit" href={webAddress}>
      {siteName}
    </Link>
    {showYear && ` ${new Date().getFullYear()}`}
  </Typography>
);

Copyright.displayName = 'Copyright';
