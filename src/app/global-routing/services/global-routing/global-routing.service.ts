import { Inject, Injectable } from '@angular/core';
import { filter, Observable, Subscription, switchMap, tap, timer } from 'rxjs';
import { AccountVerification, UserAccessCredentials } from '../../../common/domain-models';
import { AccountVerificationStoreService, UserPrincipalStoreService } from '../../../common/domain-services';
import { NavigationService } from '../../../core/services';
import { webRoutesConfig } from '../../../common/config/web-routes-config';

@Injectable({ providedIn: 'root' })
export class GlobalRoutingService {
  private readonly verification$: Observable<AccountVerification>;
  private verificationRedirect$?: Subscription;
  private missingVerificationParamsRedirect$?: Subscription;
  private login$: Observable<boolean>;
  private loginRedirect$?: Subscription;
  private autoLogout$?: Subscription;

  constructor(
    @Inject(UserPrincipalStoreService)
    private readonly userPrincipalStore: UserPrincipalStoreService,
    @Inject(AccountVerificationStoreService)
    private readonly accountVerificationStore: AccountVerificationStoreService,
    @Inject(NavigationService)
    private readonly navigationService: NavigationService
  ) {
    this.verification$ = this.accountVerificationStore.accountVerification$.pipe(
      filter(
        (accountVerification): accountVerification is AccountVerification => accountVerification !== null
      )
    );

    this.login$ = this.userPrincipalStore.userLoggedIn$.pipe(filter((userLogged) => userLogged));
  }

  public start(): void {
    this.verificationRedirect$ = this.getVerificationRedirect(this.verification$, this.navigationService);
    this.missingVerificationParamsRedirect$ = this.getMissingParamsRedirect(
      this.navigationService,
      this.accountVerificationStore
    );
    this.loginRedirect$ = this.login$.subscribe(async () => {
      // await this.navigationService.to({path: webRoutesConfig.dashboard.root});
    });
    this.autoLogout$ = this.getAutoLogout(this.userPrincipalStore, this.navigationService);
  }

  public stop(): void {
    if (this.verification$) {
      this.verificationRedirect$?.unsubscribe();
    }

    if (this.missingVerificationParamsRedirect$) {
      this.missingVerificationParamsRedirect$.unsubscribe();
    }

    if (this.loginRedirect$) {
      this.loginRedirect$.unsubscribe();
    }
  }

  private getAutoLogout(
    userPrincipalStore: UserPrincipalStoreService,
    navigationService: NavigationService
  ): Subscription {
    return userPrincipalStore.userAccessCredentials$
      .pipe(
        filter((userCredentials): userCredentials is UserAccessCredentials => {
          return userCredentials !== null;
        }),
        switchMap((userCredentials) => {
          const accessToken = userCredentials.accessToken;
          const tokenExpiryDate = userPrincipalStore.getTokenExpiryDate(accessToken);

          return timer(tokenExpiryDate);
        }),
        tap(() => {
          userPrincipalStore.logOut();
          navigationService.to({ path: webRoutesConfig.authentication.login });
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
        tap(async (route) => {
          const accountVerification = accountVerificationStore.accountVerification;
          if (route.url.includes('verify') && (!accountVerification || accountVerification.isVerified)) {
            await navigationService.to({ path: webRoutesConfig.root });
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
        tap(async (userVerification) => {
          if (!userVerification.isVerified) {
            await navigationService.to({
              path: webRoutesConfig.authentication.verifyAccount,
            });
            return;
          }

          await navigationService.to({ path: webRoutesConfig.dashboard.root });
        })
      )
      .subscribe();
  }
}
