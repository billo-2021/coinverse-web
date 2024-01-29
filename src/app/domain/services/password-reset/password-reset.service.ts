import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpMessage, HttpMessageDto } from '../../../core';
import { ApiCrudClient } from '../../../common';
import { MappingProfile } from '../../config';
import {
  PasswordResetToken,
  PasswordResetTokenDto,
  PasswordResetTokenRequest,
  PasswordTokenUser,
  PasswordTokenUserDto,
  ResetPasswordRequest,
} from '../../models';

@Injectable({
  providedIn: 'root',
})
export class PasswordResetService {
  constructor(private readonly _apiCrudClient: ApiCrudClient) {}

  public requestPasswordResetToken(
    passwordResetTokenRequest: PasswordResetTokenRequest
  ): Observable<PasswordResetToken> {
    return this._apiCrudClient.create<
      PasswordResetTokenRequest,
      PasswordResetTokenDto,
      PasswordResetToken
    >(
      'resetPassword',
      passwordResetTokenRequest,
      MappingProfile.PasswordResetTokenDtoToPasswordResetToken
    );
  }

  public requestPasswordTokenUser(token: string): Observable<PasswordTokenUser> {
    return this._apiCrudClient.findOne<PasswordTokenUserDto, PasswordTokenUser>(
      'resetPassword',
      token,
      MappingProfile.PasswordTokenUserDtoToPasswordTokenUser
    );
  }

  public resetPassword(resetPasswordRequest: ResetPasswordRequest): Observable<HttpMessage> {
    return this._apiCrudClient.patch<ResetPasswordRequest, HttpMessageDto, HttpMessage>(
      'resetPassword',
      resetPasswordRequest,
      MappingProfile.HttpMessageDtoToHttpMessage
    );
  }
}
