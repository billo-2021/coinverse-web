import { Inject, Injectable } from '@angular/core';
import { AccountVerificationStoreService, UserPrincipalStoreService } from '../../domain-services';
import { combineLatest, map, Observable } from 'rxjs';
import { UserPrincipal } from '../../domain-models';
import { MenuItem, UserPermissions } from '../../types';
import { menuItemsToken } from '../../config';
import { userRoles } from '../../constants';

@Injectable({
  providedIn: 'root',
})
export class UserPermissionsService {
  constructor(
    @Inject(UserPrincipalStoreService)
    private readonly _userPrincipalStore: UserPrincipalStoreService,
    @Inject(AccountVerificationStoreService)
    private readonly _accountVerificationStore: AccountVerificationStoreService,
    @Inject(menuItemsToken) private readonly _menuItems: MenuItem[]
  ) {}

  public get permissions$(): Observable<UserPermissions> {
    return combineLatest([
      this.userLoggedIn$,
      this.userPrincipal$,
      this.isAdmin$,
      this.isMenuShown$,
      this.menuItems$,
    ]).pipe(
      map(([userLoggedIn, userPrincipal, isAdmin, isMenuShown, menuItems]) => ({
        userLoggedIn,
        userPrincipal,
        isAdmin,
        isMenuShown,
        menuItems,
      }))
    );
  }

  public get userLoggedIn$(): Observable<boolean> {
    return this._userPrincipalStore.userLoggedIn$;
  }

  public get userPrincipal$(): Observable<UserPrincipal | null> {
    return this._userPrincipalStore.userPrincipal$;
  }

  public get userPrincipal(): UserPrincipal | null {
    return this._userPrincipalStore.userPrincipal;
  }

  public get isAdmin$(): Observable<boolean> {
    return this._userPrincipalStore.isAdmin$;
  }

  public get isAdmin(): boolean {
    return this._userPrincipalStore.isAdmin;
  }

  public get isMenuShown$(): Observable<boolean> {
    return combineLatest([this.userLoggedIn$, this.userPrincipal$]).pipe(
      map(([userLoggedIn, userPrincipal]) => userLoggedIn && !!userPrincipal && userPrincipal.isVerified)
    );
  }

  public get menuItems$(): Observable<MenuItem[]> {
    return this.isAdmin$.pipe(map((isAdmin) => this.getMenuItems(isAdmin ? 'admin' : 'customer')));
  }

  public get menuItems(): MenuItem[] {
    return this.getMenuItems(this.isAdmin ? 'admin' : 'customer');
  }

  public verifyUser(isVerified: boolean): void {
    const accountVerification = this._accountVerificationStore.accountVerification;

    const userPrincipal = this._userPrincipalStore.userPrincipal;

    if (!userPrincipal) {
      return;
    }

    this._userPrincipalStore.userPrincipal = {
      ...userPrincipal,
      isVerified: isVerified,
    };

    if (!accountVerification) {
      return;
    }

    this._accountVerificationStore.accountVerification = {
      ...accountVerification,
      isVerified: isVerified,
    };
  }

  private getMenuItems(userRole: 'admin' | 'customer'): MenuItem[] {
    return this._menuItems.filter((menuItem) =>
      menuItem.roles.some((menuItemRole) => menuItemRole === userRoles[`${userRole}`].name)
    );
  }
}
