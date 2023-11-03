import {CanActivateFn, Router} from '@angular/router';
import {UserPrincipalStoreService} from "../../domain-services";
import {inject} from "@angular/core";
import {webRoutesConfig} from "../../config/web-routes-config";

export const roleGuardGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const userPrincipalService = inject(UserPrincipalStoreService);
  const user = userPrincipalService.userPrincipal;

  if (!user) {
    router.navigate([webRoutesConfig.root]);
    return false;
  }

  const isAdmin = user.roles.some(role => role.toLowerCase() === 'admin');

  if (!isAdmin) {
    router.navigate([webRoutesConfig.root]);
    return false;
  }

  return true;
};
