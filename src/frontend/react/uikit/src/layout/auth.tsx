import * as React from 'react';
import {Component, FC} from 'react';
import {makeStyles, Container, Box, Typography, Avatar} from '../atom';
import {Copyright} from '../molecule';

interface IProps {
  title?: string;
  Icon: typeof Component;
  children: JSX.Element[] | JSX.Element;
}

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

export const AuthLayout: FC<IProps> = ({children, Icon, title = ''}) => {
  const classes = useStyles();

  return (
    <Container component="main" maxWidth="xs">
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <Icon />
        </Avatar>
        <Typography component="h1" variant="h5">
          {title}
        </Typography>
        {children}
      </div>

      <Box mt={8}>
        <Copyright webAddress="http://www.zlobin.dev" siteName="THE PLATFORM" />
      </Box>
    </Container>
  );
};

AuthLayout.displayName = 'AuthLayout';
