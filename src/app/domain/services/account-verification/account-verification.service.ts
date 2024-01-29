import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import {
  AccountVerificationStoreService,
  HttpMessage,
  HttpMessageDto,
  UserPrincipalStoreService,
} from '../../../core';
import { ApiCrudClient, UserPermissionsService } from '../../../common';
import { MappingProfile } from '../../config';
import { OtpTokenRequest, VerifyAccountRequest } from '../../models';

@Injectable({
  providedIn: 'root',
})
export class AccountVerificationService {
  constructor(
    private readonly _apiCrudApiClient: ApiCrudClient,
    private readonly _accountVerificationStore: AccountVerificationStoreService,
    private readonly _userPrincipalStore: UserPrincipalStoreService,
    private readonly _userPermissionsService: UserPermissionsService
  ) {}

  public requestOtpToken(otpTokenRequest: OtpTokenRequest): Observable<HttpMessage> {
    return this._apiCrudApiClient.create<OtpTokenRequest, HttpMessageDto, HttpMessage>(
      'requestToken',
      otpTokenRequest,
      MappingProfile.HttpMessageDtoToHttpMessage
    );
  }

  public verifyAccount(verifyAccountRequest: VerifyAccountRequest): Observable<HttpMessage> {
    return this._apiCrudApiClient
      .create<VerifyAccountRequest, HttpMessageDto, HttpMessage>(
        'verifyAccount',
        verifyAccountRequest,
        MappingProfile.HttpMessageDtoToHttpMessage
      )
      .pipe(tap(() => this._userPermissionsService.verifyUser(true)));
  }
}
