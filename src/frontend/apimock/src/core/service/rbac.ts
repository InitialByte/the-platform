import {AccessControl} from 'accesscontrol';
import {
  RBAC_ROLE_CONFIRMED,
  RBAC_ROLE_GUEST,
  RBAC_ROLE_ADMIN,
  RBAC_GRANT_USER,
  RBAC_GRANT_USERS,
} from '../../constants';

export const bootstrapRBAC = (): AccessControl => {
  const ac = new AccessControl();

  ac.grant(RBAC_ROLE_GUEST);

  ac.grant(RBAC_ROLE_CONFIRMED)
    .extend(RBAC_ROLE_GUEST)
    .readOwn(RBAC_GRANT_USER)
    .readAny(RBAC_GRANT_USER, ['fullName', 'createdAt']);

  ac.grant(RBAC_ROLE_ADMIN)
    .extend(RBAC_ROLE_CONFIRMED)
    .createAny(RBAC_GRANT_USER)
    .updateAny(RBAC_GRANT_USER)
    .readAny(RBAC_GRANT_USER)
    .deleteAny(RBAC_GRANT_USER)
    .readAny(RBAC_GRANT_USERS);

  return ac;
};
