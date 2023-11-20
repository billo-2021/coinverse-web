import { Inject, Injectable } from '@angular/core';
import { UserAccessCredentials, UserPrincipal } from '../../domain-models';
import { BehaviorSubject, combineLatest, map, Observable } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';
import { UserAccessCredentialsStoreService } from '../user-access-credentials-store/user-access-credentials-store.service';
import { LocalStorageService } from '../../../core/services/local-storage/local-storage.service';
import { StorageKey } from '../../../core/constants';
import { DateTime } from 'luxon';

type TokenExpiryOffset = {
  seconds: number;
};

const TOKEN_EXPIRY_OFFSET: TokenExpiryOffset = {
  seconds: 30,
};

@Injectable({
  providedIn: 'root',
})
export class UserPrincipalStoreService {
  private readonly _userPrincipal: BehaviorSubject<UserPrincipal | null>;

  constructor(
    @Inject(LocalStorageService)
    private readonly localStorageService: LocalStorageService,
    @Inject(JwtHelperService)
    private readonly jwtHelperService: JwtHelperService,
    @Inject(UserAccessCredentialsStoreService)
    private readonly userAccessCredentialsStoreService: UserAccessCredentialsStoreService
  ) {
    let userPrincipal = localStorageService.get<UserPrincipal>(StorageKey.USER);

    if (userPrincipal && !userPrincipal.isVerified) {
      localStorageService.remove(StorageKey.USER);
      userPrincipal = null;
      userAccessCredentialsStoreService.userCredentials = null;
    }

    this._userPrincipal = new BehaviorSubject(userPrincipal);
  }

  public get userAccessCredentials$(): Observable<UserAccessCredentials | null> {
    return this.userAccessCredentialsStoreService.userCredentials$;
  }

  public get userPrincipal$(): Observable<UserPrincipal | null> {
    return this._userPrincipal.pipe();
  }

  public get userPrincipal(): UserPrincipal | null {
    return this._userPrincipal.getValue();
  }

  public set userPrincipal(userPrincipal: UserPrincipal | null) {
    this._userPrincipal.next(userPrincipal);
    this.updateUserStorage(userPrincipal);
  }

  public get userAccessCredentials(): UserAccessCredentials | null {
    return this.userAccessCredentialsStoreService.userCredentials;
  }

  public set userCredentials(userCredentials: UserAccessCredentials | null) {
    this.userAccessCredentialsStoreService.userCredentials = userCredentials;
  }

  public get isAdmin(): boolean {
    return (
      !!this.userPrincipal &&
      this.userPrincipal.roles.some((role) => role.toLowerCase().includes('admin'))
    );
  }

  public get isAdmin$(): Observable<boolean> {
    return this.userPrincipal$.pipe(
      map(
        (userPrincipal) =>
          !!userPrincipal &&
          userPrincipal.roles.some((role) => role.toLowerCase().includes('admin'))
      )
    );
  }

  public get userLoggedIn$(): Observable<boolean> {
    return combineLatest([this.userPrincipal$, this.userAccessCredentials$]).pipe(
      map(([userPrincipal, userCredentials]) =>
        this.isUserCredentialsValid(userPrincipal, userCredentials)
      )
    );
  }

  public updateUserStorage(userPrincipal: UserPrincipal | null): void {
    if (userPrincipal == null) {
      this.localStorageService.remove(StorageKey.USER);
      return;
    }

    this.localStorageService.set(StorageKey.USER, userPrincipal);
  }

  public isLoggedIn(): boolean {
    return this.isUserCredentialsValid(this.userPrincipal, this.userAccessCredentials);
  }

  public logOut(): void {
    this.userPrincipal = null;
    this.userAccessCredentialsStoreService.userCredentials = null;
  }

  public setLoggedInUser(loggedInUser: (UserPrincipal & UserAccessCredentials) | null) {
    if (loggedInUser === null) {
      this.userPrincipal = null;
      this.userCredentials = null;
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

    this.userPrincipal = userPrincipal;
    this.userCredentials = userCredentials;
  }

  public getLoggedInUser(): (UserPrincipal & UserAccessCredentials) | null {
    const userPrincipal = this.userPrincipal;
    const userCredentials = this.userCredentials;

    if (userPrincipal == null || userCredentials == null) {
      return null;
    }

    return {
      ...userPrincipal,
      ...userCredentials,
    };
  }

  public getTokenExpiryDate(token: string): Date {
    const tokenExpiryDate = this.jwtHelperService.getTokenExpirationDate(token) || new Date();

    return DateTime.fromJSDate(tokenExpiryDate).minus(TOKEN_EXPIRY_OFFSET).toJSDate();
  }

  private isUserCredentialsValid(
    userPrincipal: UserPrincipal | null,
    userCredentials: UserAccessCredentials | null
  ): boolean {
    if (userPrincipal === null || !userPrincipal.isVerified || userCredentials === null) {
      return false;
    }

    const accessToken = userCredentials.accessToken;

    const isTokenExpired = this.isTokenExpired(accessToken);

    if (isTokenExpired) {
      this.logOut();
    }

    return !isTokenExpired;
  }

  private isTokenExpired(token: string): boolean {
    return this.jwtHelperService.isTokenExpired(token, TOKEN_EXPIRY_OFFSET.seconds);
  }
}
