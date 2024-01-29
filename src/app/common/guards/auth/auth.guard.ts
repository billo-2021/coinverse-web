import { inject } from '@angular/core';
import { UserPrincipalStoreService } from '../../../core';
import { AuthGuardOptions, WebRoutesConfigType } from '../../types';
import { NavigationService, RedirectService } from '../../services';

export function authGuard(options: AuthGuardOptions) {
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

export function isAuthenticatedGuard(route: WebRoutesConfigType) {
  return authGuard({ isAuthenticated: true, route: route });
}

export function unAuthenticatedGuard() {
  return authGuard({ isAuthenticated: false });
}
