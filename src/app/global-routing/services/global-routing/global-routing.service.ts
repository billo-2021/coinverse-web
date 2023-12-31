import { Injectable, Self } from '@angular/core';
import { combineLatest, filter, map, merge, Observable, switchMap, tap, timer } from 'rxjs';

import { DestroyService, RedirectService } from '../../../core';
import {
  AccountVerificationStoreService,
  NavigationParam,
  NavigationService,
  UserAccessCredentials,
  UserPermissionsService,
  UserPrincipalStoreService,
} from '../../../common';
import { AccountVerification } from '../../../common/domain-models/authentication';

@Injectable({ providedIn: 'root' })
export class GlobalRoutingService extends Observable<void> {
  private readonly _stream = merge(
    this._navigationService.pipe(),
    this._redirectService.pipe(),
    this.missingVerification$.pipe(tap(() => this._navigationService.to('verifyAccount').then())),
    this.verification$.pipe(tap(() => this._navigationService.to('root').then())),
    this.login$.pipe(tap(() => this._redirectService.redirect('dashboard'))),
    this.autoLogoutTimer$.pipe(
      tap(() => {
        this._userPrincipalStore$.logOut();
        this._navigationService.to('login').then();
      })
    )
  ).pipe(switchMap(() => new Observable<void>((observer) => observer.next())));

  constructor(
    private readonly _userPrincipalStore$: UserPrincipalStoreService,
    private readonly _accountVerificationStore$: AccountVerificationStoreService,
    private readonly _navigationService: NavigationService,
    private readonly _redirectService: RedirectService,
    private readonly _userPermissions$: UserPermissionsService,
    @Self() private readonly _destroy$: DestroyService
  ) {
    super((subscriber) => this._stream.subscribe(subscriber));
  }

  public get missingVerification$(): Observable<boolean> {
    return this._verification$.pipe(
      filter((userVerification) => !userVerification.isVerified),
      map((userVerification) => userVerification.isVerified)
    );
  }

  public get verification$(): Observable<AccountVerification> {
    return this._verification$.pipe(filter((userVerification) => userVerification.isVerified));
  }

  public get login$(): Observable<NavigationParam[]> {
    return combineLatest([this._isLoggedIn$, this._navigationService.history$]).pipe(
      filter(
        ([isLoggedIn, history]) =>
          isLoggedIn && history.length > 0 && history[history.length - 1] === 'login'
      ),
      map(({ 1: history }) => history)
    );
  }

  public get autoLogoutTimer$(): Observable<0> {
    return this._userPrincipalStore$.accessCredentials$.pipe(
      filter(
        (userCredentials): userCredentials is UserAccessCredentials => userCredentials !== null
      ),
      switchMap((userCredentials) => {
        const accessToken = userCredentials.accessToken;
        const tokenExpiryDate = this._userPrincipalStore$.getTokenExpiryDate(accessToken);
        return timer(tokenExpiryDate);
      })
    );
  }

  private get _isLoggedIn$(): Observable<true> {
    return this._userPrincipalStore$.userLoggedIn$.pipe(
      filter((userLoggedIn): userLoggedIn is true => userLoggedIn)
    );
  }

  private get _verification$(): Observable<AccountVerification> {
    return this._accountVerificationStore$.pipe(
      filter(
        (accountVerification): accountVerification is AccountVerification =>
          accountVerification !== null
      )
    );
  }
}
