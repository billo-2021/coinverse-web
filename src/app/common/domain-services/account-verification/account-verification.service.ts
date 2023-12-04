import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';

import { HttpCrudService, HttpMessageResponse } from '../../../core';

import { apiRoutesConfig } from '../../config';
import {
  AccountVerificationStoreService,
  UserPermissionsService,
  UserPrincipalStoreService,
} from '../../services';
import { OtpTokenRequest, VerifyAccountRequest } from '../../domain-models/authentication';

@Injectable({
  providedIn: 'root',
})
export class AccountVerificationService {
  public readonly BASE_PATH = apiRoutesConfig.authentication.root;
  public readonly VERIFY_ACCOUNT_PATH = apiRoutesConfig.authentication.verifyAccount;
  public readonly REQUEST_TOKEN_PATH = apiRoutesConfig.authentication.requestToken;

  constructor(
    private readonly _httpService: HttpCrudService,
    private readonly _accountVerificationStore: AccountVerificationStoreService,
    private readonly _userPrincipalStore: UserPrincipalStoreService,
    private readonly _userPermissionsService: UserPermissionsService
  ) {}

  public requestOtpToken(otpTokenRequest: OtpTokenRequest): Observable<HttpMessageResponse> {
    return this._httpService.create<OtpTokenRequest, HttpMessageResponse>(
      this.getFullPath(this.REQUEST_TOKEN_PATH),
      otpTokenRequest
    );
  }

  public verifyAccount(
    verifyAccountRequest: VerifyAccountRequest
  ): Observable<HttpMessageResponse> {
    return this._httpService
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
