import { inject } from '@angular/core';
import { AuthGuardOptions } from '../../types';
import { WebRoute } from '../../enums';
import { NavigationController } from '../../controllers';
import { UserPrincipalStore } from '../../stores';
import { RedirectService } from '../../services';

export function authGuard(options: AuthGuardOptions) {
  const navigationService = inject(NavigationController);
  const redirectService = inject(RedirectService);
  const userPrincipalService = inject(UserPrincipalStore);
  const isLoggedIn = userPrincipalService.isLoggedIn();

  if (options.isAuthenticated && !isLoggedIn) {
    redirectService.route = options.route;
    userPrincipalService.logOut();
    return false;
  }

  if (options.isAuthenticated && !isLoggedIn) {
    userPrincipalService.logOut();
    return false;
  }

  if (!options.isAuthenticated && isLoggedIn) {
    navigationService.to(WebRoute.ROOT).then();
    return false;
  }

  return true;
}

export function isAuthenticatedGuard(route: WebRoute) {
  return authGuard({ isAuthenticated: true, route: route });
}

export function unAuthenticatedGuard() {
  return authGuard({ isAuthenticated: false });
}
