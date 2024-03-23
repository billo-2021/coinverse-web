import { inject } from '@angular/core';
import { NavigationController } from '../../controllers';
import { UserPrincipalStore } from '../../stores';
import { WebRoute } from '../../enums';

export function roleGuard(role: string) {
  const navigationService = inject(NavigationController);
  const userPrincipalStore$ = inject(UserPrincipalStore);
  const isLoggedIn = userPrincipalStore$.isLoggedIn();
  const user = userPrincipalStore$.getValue();
  const userHasRole =
    user && user.roles.some((userRole) => userRole.toLowerCase().includes(role.toLowerCase()));

  if (!isLoggedIn || !userHasRole) {
    navigationService.to(WebRoute.ROOT).then();
    return false;
  }

  return true;
}

export function adminRoleGuard() {
  return roleGuard('admin');
}
