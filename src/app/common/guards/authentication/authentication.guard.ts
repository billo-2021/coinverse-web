import { CanActivateFn, Router } from '@angular/router';
import { inject, Inject, Injectable } from '@angular/core';
import { UserPrincipalStoreService } from '../../domain-services';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationGuardService {
  constructor(
    private readonly router: Router,
    @Inject(UserPrincipalStoreService)
    private readonly userPrincipalService: UserPrincipalStoreService
  ) {
  }

  public canActivate(): boolean {
    return this.userPrincipalService.isLoggedIn();
  }
}

export const authenticationGuard: CanActivateFn = (route, state) => {
  return inject(AuthenticationGuardService).canActivate();
};
