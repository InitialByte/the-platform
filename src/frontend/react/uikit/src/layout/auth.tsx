import * as React from 'react';
import {Component, FC} from 'react';
import {makeStyles, Container, Box, Avatar} from '../atom';
import {Copyright, LanguageSelector, IProps as ILangProps} from '../molecule';

interface IProps extends ILangProps {
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

export const AuthLayout: FC<IProps> = ({
  children,
  onChangeLanguage,
  Icon,
  currentLanguage,
  availableLanguages,
}) => {
  const classes = useStyles();

  return (
    <>
      <LanguageSelector
        onChangeLanguage={onChangeLanguage}
        availableLanguages={availableLanguages}
        currentLanguage={currentLanguage}
      />
      <Container maxWidth="xs">
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <Icon />
          </Avatar>
          {children}
        </div>

        <Box mt={8}>
          <Copyright
            webAddress="http://www.zlobin.dev"
            siteName="THE PLATFORM"
          />
        </Box>
      </Container>
    </>
  );
};

AuthLayout.displayName = 'AuthLayout';
