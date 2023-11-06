import { Inject, Injectable } from '@angular/core';
import { UserPrincipalStoreService } from '../../domain-services';
import { combineLatest, map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserPermissionsService {
  constructor(
    @Inject(UserPrincipalStoreService)
    private readonly userPrincipalStore: UserPrincipalStoreService
  ) {}

  public get isAdmin$() {
    return combineLatest([
      this.userPrincipalStore.userLoggedIn$,
      this.userPrincipalStore.userPrincipal$,
    ]).pipe(
      map(([isUserLoggedIn, userPrincipal]) => !!userPrincipal && userPrincipal.roles.includes('admin'))
    );
  }
}
