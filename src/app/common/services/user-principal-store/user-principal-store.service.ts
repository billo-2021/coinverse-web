import { Injectable, Self } from '@angular/core';
import { UserAccessCredentials, UserPrincipal } from '../../domain-models';
import {
  BehaviorSubject,
  combineLatest,
  map,
  Observable,
  shareReplay,
  skip,
  takeUntil,
  tap,
} from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';
import { UserAccessCredentialsStoreService } from '../user-access-credentials-store/user-access-credentials-store.service';
import { LocalStorageService } from '../../../core/services/local-storage/local-storage.service';
import { StorageKey } from '../../../core/constants';
import { DateTime } from 'luxon';
import { DestroyService } from '../../../core/services/destroy/destroy.service';

type TokenExpiryOffset = {
  seconds: number;
};

const TOKEN_EXPIRY_OFFSET: TokenExpiryOffset = {
  seconds: 30,
};

@Injectable({
  providedIn: 'root',
})
export class UserPrincipalStoreService extends BehaviorSubject<UserPrincipal | null> {
  public readonly userLoggedIn$: Observable<boolean>;
  public readonly isAdmin$: Observable<boolean>;
  public readonly accessCredentials$: Observable<UserAccessCredentials | null>;

  constructor(
    private readonly _localStorageService: LocalStorageService,
    private readonly _jwtHelperService: JwtHelperService,
    private readonly _userAccessCredentialsStore$: UserAccessCredentialsStoreService,
    @Self() private readonly _destroy$: DestroyService
  ) {
    super(_localStorageService.get<UserPrincipal>(StorageKey.USER));
    this.pipe(
      skip(1),
      tap((userPrincipal) => this.updateStorage(userPrincipal)),
      takeUntil(this._destroy$)
    ).subscribe();

    this.accessCredentials$ = this._userAccessCredentialsStore$.pipe(shareReplay(1));

    const userPrincipal = this.getValue();
    const userAccessCredentials = this.accessCredentials;

    if ((userPrincipal && !userPrincipal.isVerified) || (userPrincipal && !userAccessCredentials)) {
      this.next(null);
      this.accessCredentials = null;
    }

    this.userLoggedIn$ = combineLatest([this.pipe(), this.accessCredentials$]).pipe(
      map(([userPrincipal, userCredentials]) =>
        this.isUserAccessCredentialsValid(userPrincipal, userCredentials)
      ),
      shareReplay(1)
    );

    this.isAdmin$ = this.pipe(
      map(
        (userPrincipal) =>
          !!userPrincipal &&
          userPrincipal.roles.some((role) => role.toLowerCase().includes('admin'))
      ),
      shareReplay(1)
    );
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

  public updateStorage(userPrincipal: UserPrincipal | null): void {
    if (userPrincipal == null) {
      this._localStorageService.remove(StorageKey.USER);
      return;
    }

    this._localStorageService.set(StorageKey.USER, userPrincipal);
  }

  public isLoggedIn(): boolean {
    return this.isUserAccessCredentialsValid(this.getValue(), this.accessCredentials);
  }

  public logOut(): void {
    this.next(null);
    this.accessCredentials = null;
  }

  public setLoggedInUser(loggedInUser: (UserPrincipal & UserAccessCredentials) | null) {
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

  public getLoggedInUser(): (UserPrincipal & UserAccessCredentials) | null {
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

  private isUserAccessCredentialsValid(
    userPrincipal: UserPrincipal | null,
    userCredentials: UserAccessCredentials | null
  ): boolean {
    if (userPrincipal === null || !userPrincipal.isVerified || userCredentials === null) {
      return false;
    }

    const accessToken = userCredentials.accessToken;

    const isTokenExpired = this.isTokenExpired(accessToken);

    return !isTokenExpired;
  }

  private isTokenExpired(token: string): boolean {
    return this._jwtHelperService.isTokenExpired(token, TOKEN_EXPIRY_OFFSET.seconds);
  }
}
