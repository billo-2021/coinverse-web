import { Router } from '@angular/router';
import { UserPrincipalStoreService } from '../../domain-services';
import { inject } from '@angular/core';
import { webRoutesConfig } from '../../config/web-routes-config';

function roleGuard(role: string) {
  const router = inject(Router);
  const userPrincipalService = inject(UserPrincipalStoreService);
  const isLoggedIn = userPrincipalService.isLoggedIn();
  const user = userPrincipalService.userPrincipal;
  const userHasRole =
    user && user.roles.some((userRole) => userRole.toLowerCase().includes(role.toLowerCase()));

  if (!isLoggedIn || !userHasRole) {
    router.navigate([webRoutesConfig.root]).then();
    return false;
  }

  return true;
}

function adminRoleGuard() {
  return roleGuard('admin');
}

export { roleGuard, adminRoleGuard };
