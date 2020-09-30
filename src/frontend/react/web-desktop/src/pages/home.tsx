import * as React from 'react';
import {FC} from 'react';
import {makeStyles, Paper, Grid} from '@the_platform/react-uikit';

const SPACING = 2;
const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(SPACING),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
  },
}));

const HomePage: FC = () => {
  const classes = useStyles();

  return (
    <>
      <Grid item xs={12} md={8} lg={9}>
        <Paper />
      </Grid>

      <Grid item xs={12} md={4} lg={3}>
        <Paper />
      </Grid>

      <Grid item xs={12}>
        <Paper className={classes.paper} />
      </Grid>
    </>
  );
};

HomePage.displayName = 'HomePage';

// We have to do it for correct working react lazy
// eslint-disable-next-line import/no-default-export
export default HomePage;
