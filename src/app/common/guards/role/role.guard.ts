import { UserPrincipalStoreService } from '../../services';
import { inject } from '@angular/core';
import { NavigationService } from '../../../core/services';

function roleGuard(role: string) {
  const navigationService = inject(NavigationService);
  const userPrincipalService = inject(UserPrincipalStoreService);
  const isLoggedIn = userPrincipalService.isLoggedIn();
  const user = userPrincipalService.userPrincipal;
  const userHasRole =
    user && user.roles.some((userRole) => userRole.toLowerCase().includes(role.toLowerCase()));

  if (!isLoggedIn || !userHasRole) {
    navigationService.to('root').then();
    return false;
  }

  return true;
}

function adminRoleGuard() {
  return roleGuard('admin');
}

export { roleGuard, adminRoleGuard };
