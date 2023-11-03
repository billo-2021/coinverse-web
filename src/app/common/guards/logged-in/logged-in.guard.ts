import {CanActivateFn, Router} from '@angular/router';
import {inject, Inject, Injectable} from "@angular/core";
import {UserPrincipalStoreService} from "../../domain-services";
import {webRoutesConfig} from "../../config/web-routes-config";

@Injectable({
  providedIn: 'root'
})
export class LoggedInGuardService {

  constructor(private readonly router: Router,
              @Inject(UserPrincipalStoreService) private readonly userPrincipalService: UserPrincipalStoreService) {
  }

  public canActivate(): boolean {
    const isLoggedIn = this.userPrincipalService.isLoggedIn();

    if (isLoggedIn) {
      this.router.navigate([webRoutesConfig.root]);
      return false;
    }

    return true;
  }
}

export const loggedInGuard: CanActivateFn = (route, state) => {
  return inject(LoggedInGuardService).canActivate();
};
