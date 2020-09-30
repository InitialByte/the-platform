import * as React from 'react';
import {FC} from 'react';
import {useNavigate} from 'react-router-dom';
import {
  ListItemIcon,
  ListItemText,
  ListItem,
  Icon,
} from '@the_platform/react-uikit';

export const MainMenu: FC = () => {
  const navigate = useNavigate();

  return (
    <>
      <ListItem button onClick={() => navigate('/')}>
        <ListItemIcon>
          <Icon.Dashboard />
        </ListItemIcon>
        <ListItemText primary="Dashboard" />
      </ListItem>

      <ListItem button onClick={() => navigate('/customers')}>
        <ListItemIcon>
          <Icon.People />
        </ListItemIcon>
        <ListItemText primary="Customers" />
      </ListItem>

      <ListItem button onClick={() => navigate('/auth/update-password')}>
        <ListItemIcon>
          <Icon.VpnKey />
        </ListItemIcon>
        <ListItemText primary="Update Password" />
      </ListItem>

      <ListItem button onClick={() => navigate('/auth/logout')}>
        <ListItemIcon>
          <Icon.ExitToApp />
        </ListItemIcon>
        <ListItemText primary="Logout" />
      </ListItem>
    </>
  );
};
