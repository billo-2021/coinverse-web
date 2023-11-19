import { Injectable } from '@angular/core';
import { combineLatest, filter, Observable, Subscription, switchMap, tap, timer } from 'rxjs';
import { AccountVerification, UserAccessCredentials } from '../../../common/domain-models';
import { AccountVerificationStoreService, UserPrincipalStoreService } from '../../../common/services';
import { NavigationService } from '../../../core/services';
import { RedirectService } from '../../../core/services/redirect/redirect.service';

@Injectable({ providedIn: 'root' })
export class GlobalRoutingService {
  private _verificationRedirect$ = new Subscription();
  private _missingVerificationParamsRedirect$ = new Subscription();
  private _loginRedirect$ = new Subscription();
  private _autoLogout$ = new Subscription();
  private _navigation$ = new Subscription();
  private _redirectUrl$ = new Subscription();

  constructor(
    private readonly _userPrincipalStore: UserPrincipalStoreService,
    private readonly _accountVerificationStore: AccountVerificationStoreService,
    private readonly _navigationService: NavigationService,
    private readonly _redirectService: RedirectService
  ) {}

  private get _verification$(): Observable<AccountVerification> {
    return this._accountVerificationStore.accountVerification$.pipe(
      filter(
        (accountVerification): accountVerification is AccountVerification => accountVerification !== null
      )
    );
  }

  private get _isLoggedIn$(): Observable<boolean> {
    return this._userPrincipalStore.userLoggedIn$.pipe(filter((userLogged) => userLogged));
  }

  public start(): void {
    this._verificationRedirect$ = this.getVerificationRedirect(this._verification$, this._navigationService);
    this._missingVerificationParamsRedirect$ = this.getMissingParamsRedirect(
      this._navigationService,
      this._accountVerificationStore
    );
    this._loginRedirect$ = combineLatest([this._isLoggedIn$, this._navigationService.history$])
      .pipe(
        filter(
          ([isLoggedIn, history]) =>
            isLoggedIn && history.length > 0 && history[history.length - 1] === 'login'
        )
      )
      .subscribe(() => {
        this._redirectService.redirect('dashboard');
      });

    this._autoLogout$ = this.getAutoLogout(this._userPrincipalStore, this._navigationService);
    this._navigation$ = this._navigationService.navigation$.subscribe();
    this._redirectUrl$ = this._redirectService.redirectUrl$.subscribe();
  }

  public stop(): void {
    this._verificationRedirect$.unsubscribe();
    this._missingVerificationParamsRedirect$.unsubscribe();
    this._loginRedirect$.unsubscribe();
    this._redirectUrl$.unsubscribe();
  }

  private getAutoLogout(
    userPrincipalStore: UserPrincipalStoreService,
    navigationService: NavigationService
  ): Subscription {
    return userPrincipalStore.userAccessCredentials$
      .pipe(
        filter((userCredentials): userCredentials is UserAccessCredentials => userCredentials !== null),
        switchMap((userCredentials) => {
          const accessToken = userCredentials.accessToken;
          const tokenExpiryDate = userPrincipalStore.getTokenExpiryDate(accessToken);

          return timer(tokenExpiryDate);
        }),
        tap(() => {
          userPrincipalStore.logOut();
          navigationService.to('login').then();
        })
      )
      .subscribe();
  }

  private getMissingParamsRedirect(
    navigationService: NavigationService,
    accountVerificationStore: AccountVerificationStoreService
  ): Subscription {
    return navigationService.navigation$
      .pipe(
        tap((route) => {
          const accountVerification = accountVerificationStore.accountVerification;
          if (route.url.includes('verify') && (!accountVerification || accountVerification.isVerified)) {
            navigationService.to('root').then();
          }
        })
      )
      .subscribe();
  }

  private getVerificationRedirect(
    verification$: Observable<AccountVerification>,
    navigationService: NavigationService
  ): Subscription {
    return verification$
      .pipe(
        tap((userVerification) => {
          if (!userVerification.isVerified) {
            navigationService.to('verifyAccount').then();
            return;
          }

          navigationService.to('root').then();
        })
      )
      .subscribe();
  }
}
