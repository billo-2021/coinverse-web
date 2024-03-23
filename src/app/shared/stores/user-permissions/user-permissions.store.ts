import { Inject, Injectable } from '@angular/core';
import { combineLatest, map, Observable, startWith } from 'rxjs';
import { AccountVerification, UserPrincipal } from '../../models';
import { MenuItem, UserPermissions, WebConfig } from '../../types';
import { userRoles } from '../../constants';
import { WEB_CONFIG_TOKEN } from '../../tokens';
import { AccountVerificationStore, UserPrincipalStore } from '../../stores';

@Injectable({
  providedIn: 'root',
})
export class UserPermissionsStore extends Observable<UserPermissions> {
  public readonly userPrincipal$: Observable<UserPrincipal | null>;
  public readonly userLoggedIn$: Observable<boolean>;
  public readonly isAdmin$: Observable<boolean>;
  public readonly isMenuShown$: Observable<boolean>;
  public readonly menuItems$: Observable<readonly MenuItem[]>;
  private readonly _menuItems: readonly MenuItem[] = this._webConfig.menuItems;

  public constructor(
    @Inject(WEB_CONFIG_TOKEN) private readonly _webConfig: WebConfig,
    private readonly _userPrincipalStore$: UserPrincipalStore,
    private readonly _accountVerificationStore$: AccountVerificationStore
  ) {
    super((subscriber) =>
      combineLatest([
        this.userLoggedIn$,
        this.userPrincipal$,
        this.isAdmin$,
        this.isMenuShown$,
        this.menuItems$,
      ])
        .pipe(
          map(([userLoggedIn, userPrincipal, isAdmin, isMenuShown, menuItems]) => ({
            userLoggedIn,
            userPrincipal,
            isAdmin,
            isMenuShown: isMenuShown,
            menuItems,
          }))
        )
        .subscribe(subscriber)
    );

    this.userPrincipal$ = this._userPrincipalStore$.asObservable();
    this.userLoggedIn$ = this._userPrincipalStore$.userLoggedIn$;
    this.isAdmin$ = this._userPrincipalStore$.isAdmin$;

    this.isMenuShown$ = combineLatest([this.userLoggedIn$, this.userPrincipal$]).pipe(
      map(
        ([userLoggedIn, userPrincipal]) =>
          userLoggedIn && !!userPrincipal && userPrincipal.isVerified
      ),
      startWith(false)
    );

    this.menuItems$ = this.isAdmin$.pipe(
      map((isAdmin) => this.getMenuItems(isAdmin ? 'ADMIN' : 'CUSTOMER'))
    );
  }

  public get userPrincipal(): UserPrincipal | null {
    return this._userPrincipalStore$.getValue();
  }

  public get accountVerification(): AccountVerification | null {
    return this._accountVerificationStore$.getValue();
  }

  public get isAdmin(): boolean {
    return this._userPrincipalStore$.isAdmin;
  }

  public get menuItems(): MenuItem[] {
    return this.getMenuItems(this.isAdmin ? 'ADMIN' : 'CUSTOMER');
  }

  public verifyUser(isVerified: boolean): void {
    const accountVerification = this.accountVerification;
    const userPrincipal = this.userPrincipal;

    if (accountVerification !== null) {
      this._accountVerificationStore$.next({ ...accountVerification, isVerified: isVerified });
    }

    if (!userPrincipal) {
      return;
    }

    this._userPrincipalStore$.next({
      ...userPrincipal,
      isVerified: isVerified,
    });

    if (accountVerification == null) {
      this._accountVerificationStore$.next({
        username: userPrincipal.username,
        emailAddress: userPrincipal.emailAddress,
        isVerified: isVerified,
      });
    }
  }

  private getMenuItems(userRole: 'ADMIN' | 'CUSTOMER'): MenuItem[] {
    return this._menuItems.filter((menuItem) =>
      menuItem.roles.some((menuItemRole) => menuItemRole === userRoles[userRole].name)
    );
  }
}
