import { Injectable, Self } from '@angular/core';
import {
  distinctUntilChanged,
  filter,
  map,
  merge,
  Observable,
  skip,
  switchMap,
  tap,
  timer,
} from 'rxjs';
import {
  AccountVerificationStoreService,
  DestroyService,
  UserAccessCredentials,
  UserPrincipalStoreService,
} from '../../../core';
import { NavigationService, RedirectService, UserPermissionsService } from '../../../common';
import { AccountVerification } from '../../../domain';

@Injectable({ providedIn: 'root' })
export class GlobalRoutingService extends Observable<void> {
  private readonly _stream = merge(
    this._navigationService.pipe(),
    this._redirectService.pipe(),
    this.missingVerification$.pipe(tap(() => this._navigationService.to('verifyAccount').then())),
    this.verification$.pipe(tap(() => this._navigationService.to('root').then())),
    this._isLoggedIn$.pipe(tap(() => this._redirectService.redirect('dashboard'))),
    this.autoLogoutTimer$.pipe(tap(() => this._userPrincipalStore$.logOut())),
    this._userPrincipalStore$.userLoggedIn$.pipe(
      distinctUntilChanged(),
      filter((userLoggedIn) => !userLoggedIn),
      tap(() => this._navigationService.to('login').then())
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
      skip(1),
      distinctUntilChanged(),
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
