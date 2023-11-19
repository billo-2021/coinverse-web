import { UserPrincipal } from '../domain-models';
import { MenuItem } from './menu-item';

export type UserPermissions = {
  readonly userPrincipal: UserPrincipal | null;
  readonly isAdmin: boolean;
  readonly isMenuShown: boolean;
  readonly menuItems: MenuItem[];
};
