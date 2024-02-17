import { Injectable } from '@angular/core';
import { BehaviorSubject, combineLatest, map, Observable } from 'rxjs';
import { DateTime } from 'luxon';
import { JwtHelperService } from '@auth0/angular-jwt';
import { StorageKey } from '../../constants';
import { UserAccessCredentials, UserPrincipal } from '../../models';
import { LocalStorageService } from '../local-storage/local-storage.service';
import { UserAccessCredentialsStoreService } from '../user-access-credentials-store/user-access-credentials-store.service';

export type TokenExpiryOffset = {
  seconds: number;
};

export const TOKEN_EXPIRY_OFFSET: TokenExpiryOffset = {
  seconds: 30,
};

@Injectable({
  providedIn: 'root',
})
export class UserPrincipalStoreService extends BehaviorSubject<UserPrincipal | null> {
  public readonly accessCredentials$: Observable<UserAccessCredentials | null> =
    this._userAccessCredentialsStore$;

  public readonly userLoggedIn$: Observable<boolean> = combineLatest([
    this.pipe(),
    this.accessCredentials$,
  ]).pipe(
    map(([userPrincipal, userCredentials]) =>
      this._isUserAccessCredentialsValid(userPrincipal, userCredentials)
    )
  );

  public readonly isAdmin$: Observable<boolean> = this.pipe(
    map(
      (userPrincipal) =>
        !!userPrincipal && userPrincipal.roles.some((role) => role.toLowerCase().includes('admin'))
    )
  );

  constructor(
    private readonly _localStorageService: LocalStorageService,
    private readonly _jwtHelperService: JwtHelperService,
    private readonly _userAccessCredentialsStore$: UserAccessCredentialsStoreService
  ) {
    super(_localStorageService.get<UserPrincipal>(StorageKey.USER));

    const userPrincipal = this.getValue();
    const userAccessCredentials = this.accessCredentials;

    if ((userPrincipal && !userPrincipal.isVerified) || (userPrincipal && !userAccessCredentials)) {
      this.next(null);
      this.accessCredentials = null;
    }
  }

  public get accessCredentials(): UserAccessCredentials | null {
    return this._userAccessCredentialsStore$.getValue();
  }

  public set accessCredentials(accessCredentials: UserAccessCredentials | null) {
    this._userAccessCredentialsStore$.next(accessCredentials);
  }

  public get isAdmin(): boolean {
    const userPrincipal = this.getValue();

    return (
      !!userPrincipal && userPrincipal.roles.some((role) => role.toLowerCase().includes('admin'))
    );
  }

  public override next(value: UserPrincipal | null): void {
    super.next(value);
    this._updateUserPrincipalStorage(value);
  }

  public isLoggedIn(): boolean {
    return this._isUserAccessCredentialsValid(this.getValue(), this.accessCredentials);
  }

  public logOut(): void {
    this.next(null);
    this.accessCredentials = null;
  }

  public setUserDetails(loggedInUser: (UserPrincipal & UserAccessCredentials) | null): void {
    if (loggedInUser === null) {
      this.next(null);
      this.accessCredentials = null;
      return;
    }

    const userPrincipal: UserPrincipal = {
      username: loggedInUser.username,
      emailAddress: loggedInUser.emailAddress,
      firstName: loggedInUser.firstName,
      lastName: loggedInUser.lastName,
      phoneNumber: loggedInUser.phoneNumber,
      isVerified: loggedInUser.isVerified,
      roles: loggedInUser.roles,
    };

    const userCredentials: UserAccessCredentials = {
      username: loggedInUser.username,
      accessToken: loggedInUser.accessToken,
      refreshToken: loggedInUser.refreshToken,
    };

    this.next(userPrincipal);
    this.accessCredentials = userCredentials;
  }

  public getUserDetails(): (UserPrincipal & UserAccessCredentials) | null {
    const userPrincipal = this.getValue();
    const userCredentials = this.accessCredentials;

    if (userPrincipal == null || userCredentials == null) {
      return null;
    }

    return {
      ...userPrincipal,
      ...userCredentials,
    };
  }

  public getTokenExpiryDate(token: string): Date {
    const tokenExpiryDate = this._jwtHelperService.getTokenExpirationDate(token) || new Date();
    return DateTime.fromJSDate(tokenExpiryDate).minus(TOKEN_EXPIRY_OFFSET).toJSDate();
  }

  private _updateUserPrincipalStorage(userPrincipal: UserPrincipal | null): void {
    if (userPrincipal == null) {
      this._localStorageService.remove(StorageKey.USER);
      return;
    }

    this._localStorageService.set(StorageKey.USER, userPrincipal);
  }

  private _isUserAccessCredentialsValid(
    userPrincipal: UserPrincipal | null,
    userCredentials: UserAccessCredentials | null
  ): boolean {
    if (userPrincipal === null || !userPrincipal.isVerified || userCredentials === null) {
      return false;
    }

    const accessToken = userCredentials.accessToken;
    return !this._isTokenExpired(accessToken);
  }

  private _isTokenExpired(token: string): boolean {
    return this._jwtHelperService.isTokenExpired(token, TOKEN_EXPIRY_OFFSET.seconds);
  }
}
