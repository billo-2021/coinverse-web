import { Inject, Injectable } from '@angular/core';
import { combineLatest, map, Observable, shareReplay } from 'rxjs';

import { MenuItem, UserPermissions } from '../../types';
import { menuItemsToken } from '../../config';
import { userRoles } from '../../constants';
import { UserPrincipal } from '../../domain-models';
import { AccountVerification } from '../../domain-models/authentication';
import { UserPrincipalStoreService } from '../user-principal-store/user-principal-store.service';
import { AccountVerificationStoreService } from '../account-verification-store/account-verification-store.service';

@Injectable({
  providedIn: 'root',
})
export class UserPermissionsService extends Observable<UserPermissions> {
  public readonly userPrincipal$: Observable<UserPrincipal | null>;
  public readonly userLoggedIn$: Observable<boolean>;
  public readonly isAdmin$: Observable<boolean>;

  public readonly isMenuShown$: Observable<boolean>;
  public readonly menuItems$: Observable<MenuItem[]>;

  constructor(
    private readonly _userPrincipalStore$: UserPrincipalStoreService,
    private readonly _accountVerificationStore$: AccountVerificationStoreService,
    @Inject(menuItemsToken) private readonly _menuItems: MenuItem[]
  ) {
    super((subscriber) => {
      return combineLatest([
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
            isMenuShown,
            menuItems,
          })),
          shareReplay(1)
        )
        .subscribe(subscriber);
    });

    this.userPrincipal$ = this._userPrincipalStore$.asObservable();
    this.userLoggedIn$ = this._userPrincipalStore$.userLoggedIn$.pipe();
    this.isAdmin$ = this._userPrincipalStore$.isAdmin$.pipe();

    this.isMenuShown$ = combineLatest([this.userLoggedIn$, this.userPrincipal$]).pipe(
      map(
        ([userLoggedIn, userPrincipal]) =>
          userLoggedIn && !!userPrincipal && userPrincipal.isVerified
      ),
      shareReplay(1)
    );

    this.menuItems$ = this.isAdmin$.pipe(
      map((isAdmin) => this.getMenuItems(isAdmin ? 'admin' : 'customer')),
      shareReplay(1)
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
    return this.getMenuItems(this.isAdmin ? 'admin' : 'customer');
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

  private getMenuItems(userRole: 'admin' | 'customer'): MenuItem[] {
    return this._menuItems.filter((menuItem) =>
      menuItem.roles.some((menuItemRole) => menuItemRole === userRoles[`${userRole}`].name)
    );
  }
}
