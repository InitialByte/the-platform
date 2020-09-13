import * as React from 'react';
import {Typography, Link} from '../../atom';

export function Copyright(): JSX.Element {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://domain.com/">
        Our Site
      </Link>
      {new Date().getFullYear()}
    </Typography>
  );
}

Copyright.displayName = 'Copyright';
