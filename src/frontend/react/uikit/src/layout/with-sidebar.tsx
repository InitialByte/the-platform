import {FC, useState} from 'react';
import {clsx, useTranslation} from '@the_platform/core';
import {Copyright, LanguageSelector, IProps as ILangProps} from '../molecule';
import {
  IconButton,
  Typography,
  makeStyles,
  Container,
  Toolbar,
  Divider,
  Appbar,
  Drawer,
  Badge,
  List,
  Grid,
  Icon,
  Box,
} from '../atom';

const drawerWidth = 240;

/* eslint-disable @typescript-eslint/no-magic-numbers */
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

  fixedHeight: {
    height: 240,
  },
}));
/* eslint-enable @typescript-eslint/no-magic-numbers */

interface IProps extends ILangProps {
  children: JSX.Element[] | JSX.Element;
  Menu: FC<Record<string, unknown>>;
}

export const WithSidebarLayout: FC<IProps> = ({
  children,
  Menu,
  onChangeLanguage,
  currentLanguage,
  availableLanguages,
}) => {
  const classes = useStyles();
  const [open, setOpen] = useState(true);
  const handleDrawerOpen = (): ReturnType<typeof setOpen> => setOpen(true);
  const handleDrawerClose = (): ReturnType<typeof setOpen> => setOpen(false);
  const {t} = useTranslation('root');

  return (
    <div className={classes.root}>
      <Appbar
        position="absolute"
        className={clsx({
          [classes.appBar]: true,
          [classes.appBarShift]: open,
        })}>
        <Toolbar className={classes.toolbar}>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            className={clsx({
              [classes.menuButton]: true,
              [classes.menuButtonHidden]: open,
            })}>
            <Icon.Menu />
          </IconButton>

          <Typography
            variant="h6"
            color="inherit"
            noWrap
            className={classes.title}>
            {t('layout.withSidebar.dashboard')}
          </Typography>

          <IconButton color="inherit">
            <Icon.Translate />
            <LanguageSelector
              onChangeLanguage={onChangeLanguage}
              availableLanguages={availableLanguages}
              currentLanguage={currentLanguage}
            />
          </IconButton>

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
          paper: clsx({
            [classes.drawerPaper]: true,
            [classes.drawerPaperClose]: !open,
          }),
        }}
        open={open}>
        <div className={classes.toolbarIcon}>
          <IconButton onClick={handleDrawerClose}>
            <Icon.ChevronLeft />
          </IconButton>
        </div>

        <Divider />
        <List>
          <Menu />
        </List>
      </Drawer>

      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth="lg" className={classes.container}>
          <Grid container spacing={3}>
            {children}
          </Grid>

          <Box pt={4}>
            <Copyright
              webAddress="https://www.zlobin.dev"
              siteName={t('sitename')}
            />
          </Box>
        </Container>
      </main>
    </div>
  );
};

WithSidebarLayout.displayName = 'WithSidebarLayout';
