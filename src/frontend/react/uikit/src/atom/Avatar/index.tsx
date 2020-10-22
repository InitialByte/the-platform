import {Avatar as MUIAvatar, AvatarProps} from '@material-ui/core';

export const Avatar = (props: AvatarProps): ReturnType<typeof MUIAvatar> => (
  <MUIAvatar {...props} />
);
