import { inject } from '@angular/core';

import { RedirectService } from '../../../core';

import { NavigationService, UserPrincipalStoreService } from '../../services';
import { AuthGuardOptions, WebRoutesConfigType } from '../../types';

function authGuard(options: AuthGuardOptions) {
  const navigationService = inject(NavigationService);
  const redirectService = inject(RedirectService);
  const userPrincipalService = inject(UserPrincipalStoreService);
  const isLoggedIn = userPrincipalService.isLoggedIn();

  if (options.isAuthenticated && !isLoggedIn) {
    redirectService.route = options.route;
    navigationService.to('login').then();
    return false;
  }

  if (options.isAuthenticated && !isLoggedIn) {
    navigationService.to('login').then();
    return false;
  }

  if (!options.isAuthenticated && isLoggedIn) {
    navigationService.to('root').then();
    return false;
  }

  return true;
}

function isAuthenticatedGuard(route: WebRoutesConfigType) {
  return authGuard({ isAuthenticated: true, route: route });
}

function unAuthenticatedGuard() {
  return authGuard({ isAuthenticated: false });
}

export { authGuard, isAuthenticatedGuard, unAuthenticatedGuard };
