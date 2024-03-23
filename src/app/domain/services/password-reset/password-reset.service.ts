import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiCrudClient, ApiRoute, HttpMessage, HttpMessageDto } from '../../../shared';
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
      ApiRoute.RESET_PASSWORD,
      passwordResetTokenRequest,
      MappingProfile.PasswordResetTokenDtoToPasswordResetToken
    );
  }

  public requestPasswordTokenUser(token: string): Observable<PasswordTokenUser> {
    return this._apiCrudClient.findOne<PasswordTokenUserDto, PasswordTokenUser>(
      ApiRoute.RESET_PASSWORD,
      token,
      MappingProfile.PasswordTokenUserDtoToPasswordTokenUser
    );
  }

  public resetPassword(resetPasswordRequest: ResetPasswordRequest): Observable<HttpMessage> {
    return this._apiCrudClient.patch<ResetPasswordRequest, HttpMessageDto, HttpMessage>(
      ApiRoute.RESET_PASSWORD,
      resetPasswordRequest,
      MappingProfile.HttpMessageDtoToHttpMessage
    );
  }
}
