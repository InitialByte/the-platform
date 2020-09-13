import * as React from 'react';
import {FC} from 'react';
import {makeStyles, Container, Box, Typography, Avatar, Icon} from '../atom';
import {Copyright} from '../molecule';

const spacing = 8;
const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(spacing),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
}));

export const AuthLayout: FC = ({children}) => {
  const classes = useStyles();

  return (
    <Container component="main" maxWidth="xs">
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <Icon.LockOutlined />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        {children}
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  );
};
