import {CanActivateFn, Router} from '@angular/router';
import {inject, Inject, Injectable} from "@angular/core";
import {UserPrincipalStoreService} from "../../domain-services";
import {webRoutesConfig} from "../../config/web-routes-config";

@Injectable({
  providedIn: 'root'
})
export class AuthenticationGuardService {

  constructor(private readonly router: Router,
              @Inject(UserPrincipalStoreService) private readonly userPrincipalService: UserPrincipalStoreService) {
  }

  public canActivate(): boolean {
    const isLoggedIn = this.userPrincipalService.isLoggedIn();

    if (!isLoggedIn) {
      this.router.navigate([webRoutesConfig.authentication.login]);
      return false;
    }

    return true;
  }
}

export const authenticationGuard: CanActivateFn = (route, state) => {
  return inject(AuthenticationGuardService).canActivate();
};
