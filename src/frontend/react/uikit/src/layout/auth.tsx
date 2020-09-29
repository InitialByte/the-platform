import * as React from 'react';
import {ReactNode} from 'react';
import {makeStyles, Container, Box, Typography, Avatar} from '../atom';
import {Copyright} from '../molecule';

interface IProps {
  title: string;
  Icon: ReactNode;
  children: any;
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

export const AuthLayout = ({children, Icon, title}: IProps): JSX.Element => {
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
        <Copyright />
      </Box>
    </Container>
  );
};
