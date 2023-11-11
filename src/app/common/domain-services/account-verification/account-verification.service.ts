import { Inject, Injectable } from '@angular/core';
import { OtpTokenRequest, VerifyAccountRequest } from '../../domain-models';
import { Observable, tap } from 'rxjs';
import { HttpMessageResponse } from '../../../core/types';
import { HttpCrudService } from '../../../core/services';
import { apiRoutesConfig } from '../../config';
import {
  AccountVerificationStoreService
} from '../account-verification-store/account-verification-store.service';
import { UserPrincipalStoreService } from '../user-principal-store/user-principal-store.service';
import { UserPermissionsService } from "../../services/user-permissions/user-permissions.service";

@Injectable({
  providedIn: 'root',
})
export class AccountVerificationService {
  public readonly BASE_PATH = apiRoutesConfig.authentication.root;
  public readonly VERIFY_ACCOUNT_PATH = apiRoutesConfig.authentication.verifyAccount;
  public readonly REQUEST_TOKEN_PATH = apiRoutesConfig.authentication.requestToken;

  constructor(
    @Inject(HttpCrudService) private readonly httpService: HttpCrudService,
    @Inject(AccountVerificationStoreService)
    private readonly accountVerificationStore: AccountVerificationStoreService,
    @Inject(UserPrincipalStoreService)
    private readonly userPrincipalStore: UserPrincipalStoreService,
    private readonly _userPermissionsService: UserPermissionsService
  ) {
  }

  public requestOtpToken(otpTokenRequest: OtpTokenRequest): Observable<HttpMessageResponse> {
    return this.httpService.create<OtpTokenRequest, HttpMessageResponse>(
      this.getFullPath(this.REQUEST_TOKEN_PATH),
      otpTokenRequest
    );
  }

  public verifyAccount(verifyAccountRequest: VerifyAccountRequest): Observable<HttpMessageResponse> {
    return this.httpService
      .create<VerifyAccountRequest, HttpMessageResponse>(
        this.getFullPath(this.VERIFY_ACCOUNT_PATH),
        verifyAccountRequest
      )
      .pipe(
        tap(() => {
          this._userPermissionsService.verifyUser(true);
        })
      );
  }

  private getFullPath(path: string): string {
    return `${this.BASE_PATH}${path}`;
  }
}
