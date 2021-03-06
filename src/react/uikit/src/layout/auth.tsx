import {Component, FC} from 'react';
import {useTranslation} from '@the_platform/core';
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
  const {t} = useTranslation('root');

  return (
    <>
      <LanguageSelector
        onChangeLanguage={onChangeLanguage}
        availableLanguages={availableLanguages}
        currentLanguage={currentLanguage}
      />
      <main>
        <Container maxWidth="xs">
          <div className={classes.paper}>
            <Avatar className={classes.avatar}>
              <Icon />
            </Avatar>
            {children}
          </div>

          <Box sx={{mt: 8}}>
            <Copyright
              webAddress="https://www.zlobin.dev/"
              siteName={t('sitename')}
            />
          </Box>
        </Container>
      </main>
    </>
  );
};

AuthLayout.displayName = 'AuthLayout';
