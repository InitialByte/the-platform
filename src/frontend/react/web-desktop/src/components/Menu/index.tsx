import * as React from 'react';
import {FC} from 'react';
import {useNavigate} from 'react-router-dom';
import {
  ListItemIcon,
  ListItemText,
  ListItem,
  Icon,
} from '@the_platform/react-uikit';
import {useTranslation} from '@the_platform/core';

export const MainMenu: FC = () => {
  const navigate = useNavigate();
  const {t} = useTranslation('root');

  return (
    <>
      <ListItem button onClick={() => navigate('/')}>
        <ListItemIcon>
          <Icon.Dashboard />
        </ListItemIcon>
        <ListItemText primary={t('mainMenu.dashboard')} />
      </ListItem>

      <ListItem button onClick={() => navigate('/customers')}>
        <ListItemIcon>
          <Icon.People />
        </ListItemIcon>
        <ListItemText primary={t('mainMenu.customers')} />
      </ListItem>

      <ListItem button onClick={() => navigate('/auth/update-password')}>
        <ListItemIcon>
          <Icon.VpnKey />
        </ListItemIcon>
        <ListItemText primary={t('mainMenu.updatePassword')} />
      </ListItem>

      <ListItem button onClick={() => navigate('/auth/logout')}>
        <ListItemIcon>
          <Icon.ExitToApp />
        </ListItemIcon>
        <ListItemText primary={t('mainMenu.logout')} />
      </ListItem>
    </>
  );
};
