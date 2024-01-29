import { inject } from '@angular/core';
import { UserPrincipalStoreService } from '../../../core';
import { NavigationService } from '../../services';

export function roleGuard(role: string) {
  const navigationService = inject(NavigationService);
  const userPrincipalStore$ = inject(UserPrincipalStoreService);
  const isLoggedIn = userPrincipalStore$.isLoggedIn();
  const user = userPrincipalStore$.getValue();
  const userHasRole =
    user && user.roles.some((userRole) => userRole.toLowerCase().includes(role.toLowerCase()));

  if (!isLoggedIn || !userHasRole) {
    navigationService.to('root').then();
    return false;
  }

  return true;
}

export function adminRoleGuard() {
  return roleGuard('admin');
}
