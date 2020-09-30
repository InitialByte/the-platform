/* eslint-disable */
// @ts-nocheck

import * as React from 'react';
import {FC, useState} from 'react';
import {
  ListSubheader,
  ListItemIcon,
  ListItemText,
  IconButton,
  Typography,
  makeStyles,
  Container,
  Copyright,
  ListItem,
  Toolbar,
  Divider,
  Appbar,
  Drawer,
  Paper,
  Badge,
  List,
  Grid,
  Icon,
  Box,
} from '@the_platform/react-uikit';
import {clsx} from '@the_platform/core';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  toolbar: {
    paddingRight: 24,
  },
  toolbarIcon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  menuButtonHidden: {
    display: 'none',
  },
  title: {
    flexGrow: 1,
  },
  drawerPaper: {
    position: 'relative',
    whiteSpace: 'nowrap',
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaperClose: {
    overflowX: 'hidden',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing(7),
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9),
    },
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: '100vh',
    overflow: 'auto',
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
  },
  fixedHeight: {
    height: 240,
  },
}));

const mainListItems = (
  <>
    <ListItem button>
      <ListItemIcon>
        <Icon.Dashboard />
      </ListItemIcon>
      <ListItemText primary="Dashboard" />
    </ListItem>

    <ListItem button>
      <ListItemIcon>
        <Icon.ShoppingCart />
      </ListItemIcon>
      <ListItemText primary="Orders" />
    </ListItem>

    <ListItem button>
      <ListItemIcon>
        <Icon.People />
      </ListItemIcon>
      <ListItemText primary="Customers" />
    </ListItem>

    <ListItem button>
      <ListItemIcon>
        <Icon.BarChart />
      </ListItemIcon>
      <ListItemText primary="Reports" />
    </ListItem>

    <ListItem button>
      <ListItemIcon>
        <Icon.Layers />
      </ListItemIcon>
      <ListItemText primary="Integrations" />
    </ListItem>
  </>
);

const secondaryListItems = (
  <>
    <ListSubheader inset>Saved reports</ListSubheader>

    <ListItem button>
      <ListItemIcon>
        <Icon.Assignment />
      </ListItemIcon>
      <ListItemText primary="Current month" />
    </ListItem>

    <ListItem button>
      <ListItemIcon>
        <Icon.Assignment />
      </ListItemIcon>
      <ListItemText primary="Last quarter" />
    </ListItem>

    <ListItem button>
      <ListItemIcon>
        <Icon.Assignment />
      </ListItemIcon>
      <ListItemText primary="Year-end sale" />
    </ListItem>
  </>
);

const HomePage: FC = () => {
  const classes = useStyles();
  const [open, setOpen] = useState(true);
  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };
  return (
    <div className={classes.root}>
      <Appbar
        position="absolute"
        className={clsx(classes.appBar, open && classes.appBarShift)}>
        <Toolbar className={classes.toolbar}>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            className={clsx(
              classes.menuButton,
              open && classes.menuButtonHidden,
            )}>
            <Icon.Menu />
          </IconButton>

          <Typography
            component="h1"
            variant="h6"
            color="inherit"
            noWrap
            className={classes.title}>
            Dashboard
          </Typography>

          <IconButton color="inherit">
            <Badge badgeContent={4} color="secondary">
              <Icon.Notifications />
            </Badge>
          </IconButton>
        </Toolbar>
      </Appbar>

      <Drawer
        variant="permanent"
        classes={{
          paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose),
        }}
        open={open}>
        <div className={classes.toolbarIcon}>
          <IconButton onClick={handleDrawerClose}>
            <Icon.ChevronLeft />
          </IconButton>
        </div>

        <Divider />
        <List>{mainListItems}</List>

        <Divider />
        <List>{secondaryListItems}</List>
      </Drawer>

      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth="lg" className={classes.container}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={8} lg={9}>
              <Paper />
            </Grid>

            <Grid item xs={12} md={4} lg={3}>
              <Paper />
            </Grid>

            <Grid item xs={12}>
              <Paper className={classes.paper} />
            </Grid>
          </Grid>

          <Box pt={4}>
            <Copyright webAddress="test.com" siteName="PLT" />
          </Box>
        </Container>
      </main>
    </div>
  );
};

/*
    <Link to="auth/logout" variant="body2">
      Logout
    </Link>
    <Link to="auth/update-password" variant="body2">
      Update Password
    </Link>

*/

HomePage.displayName = 'HomePage';

// We have to do it for correct working react lazy
// eslint-disable-next-line import/no-default-export
export default HomePage;
