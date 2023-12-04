import { inject } from '@angular/core';

import { NavigationService, UserPrincipalStoreService } from '../../services';

function roleGuard(role: string) {
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

function adminRoleGuard() {
  return roleGuard('admin');
}

export { roleGuard, adminRoleGuard };
