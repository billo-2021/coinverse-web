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
  AccountVerificationStore,
  DestroyState,
  NavigationController,
  RedirectService,
  UserAccessCredentials,
  UserPermissionsStore,
  UserPrincipalStore,
  WebRoute,
} from '../../../shared';
import { AccountVerification } from '../../../domain';

@Injectable({ providedIn: 'root' })
export class GlobalRoutingService extends Observable<void> {
  private readonly _stream = merge(
    this._navigationService.pipe(),
    this._redirectService.pipe(),
    this.missingVerification$.pipe(
      tap(() => this._navigationService.to(WebRoute.VERIFY_ACCOUNT).then())
    ),
    this.verification$.pipe(tap(() => this._navigationService.to(WebRoute.ROOT).then())),
    this._isLoggedIn$.pipe(tap(() => this._redirectService.redirect(WebRoute.DASHBOARD))),
    this.autoLogoutTimer$.pipe(tap(() => this._userPrincipalStore$.logOut())),
    this._userPrincipalStore$.userLoggedIn$.pipe(
      distinctUntilChanged(),
      filter((userLoggedIn) => !userLoggedIn),
      tap(() => this._navigationService.to(WebRoute.LOGIN).then())
    )
  ).pipe(switchMap(() => new Observable<void>((observer) => observer.next())));

  constructor(
    private readonly _userPrincipalStore$: UserPrincipalStore,
    private readonly _accountVerificationStore$: AccountVerificationStore,
    private readonly _navigationService: NavigationController,
    private readonly _redirectService: RedirectService,
    private readonly _userPermissions$: UserPermissionsStore,
    @Self() private readonly _destroy$: DestroyState
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
