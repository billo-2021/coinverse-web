import { Router } from '@angular/router';
import { inject } from '@angular/core';
import { UserPrincipalStoreService } from '../../domain-services';
import { webRoutesConfig } from '../../config/web-routes-config';

function authGuard(options: { isAuthenticated: true; redirectUrl?: string } | { isAuthenticated: false }) {
  const router = inject(Router);
  const userPrincipalService = inject(UserPrincipalStoreService);
  const isLoggedIn = userPrincipalService.isLoggedIn();

  if (options.isAuthenticated && !isLoggedIn && options.redirectUrl) {
    router
      .navigate([webRoutesConfig.authentication.login], {
        queryParams: { redirectUrl: options.redirectUrl },
      })
      .then();
    return false;
  }

  if (options.isAuthenticated && !isLoggedIn) {
    router.navigate([webRoutesConfig.authentication.login]).then();
    return false;
  }

  if (!options.isAuthenticated && isLoggedIn) {
    router.navigate([webRoutesConfig.dashboard.root]).then();
    return false;
  }

  return true;
}

function isAuthenticatedGuard(redirectUrl: string) {
  return authGuard({ isAuthenticated: true, redirectUrl: redirectUrl });
}

function unAuthenticatedGuard() {
  return authGuard({ isAuthenticated: false });
}

export { authGuard, isAuthenticatedGuard, unAuthenticatedGuard };
