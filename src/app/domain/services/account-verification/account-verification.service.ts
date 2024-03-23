import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import {
  AccountVerificationStore,
  ApiCrudClient,
  ApiRoute,
  HttpMessage,
  HttpMessageDto,
  UserPermissionsStore,
  UserPrincipalStore,
} from '../../../shared';
import { MappingProfile } from '../../config';
import { OtpTokenRequest, VerifyAccountRequest } from '../../models';

@Injectable({
  providedIn: 'root',
})
export class AccountVerificationService {
  constructor(
    private readonly _apiCrudApiClient: ApiCrudClient,
    private readonly _accountVerificationStore: AccountVerificationStore,
    private readonly _userPrincipalStore: UserPrincipalStore,
    private readonly _userPermissionsService: UserPermissionsStore
  ) {}

  public requestOtpToken(otpTokenRequest: OtpTokenRequest): Observable<HttpMessage> {
    return this._apiCrudApiClient.create<OtpTokenRequest, HttpMessageDto, HttpMessage>(
      ApiRoute.REQUEST_TOKEN,
      otpTokenRequest,
      MappingProfile.HttpMessageDtoToHttpMessage
    );
  }

  public verifyAccount(verifyAccountRequest: VerifyAccountRequest): Observable<HttpMessage> {
    return this._apiCrudApiClient
      .create<VerifyAccountRequest, HttpMessageDto, HttpMessage>(
        ApiRoute.VERIFY_ACCOUNT,
        verifyAccountRequest,
        MappingProfile.HttpMessageDtoToHttpMessage
      )
      .pipe(tap(() => this._userPermissionsService.verifyUser(true)));
  }
}
