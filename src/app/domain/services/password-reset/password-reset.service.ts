import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';

import { HttpCrudService, HttpMessageResponse } from '../../../core';

import { apiRoutesConfig } from '../../config';
import {
  PasswordResetTokenDto,
  PasswordResetTokenRequest,
  PasswordResetTokenResponse,
  PasswordTokenUserDto,
  PasswordTokenUserResponse,
  ResetPasswordRequest,
} from '../../domain-models/authentication';
import {
  passResetTokenDtoToPasswordResetTokenResponse,
  passwordTokenUserDtoToPasswordTokenUserResponse,
} from '../../mappers';

@Injectable({
  providedIn: 'root',
})
export class PasswordResetService {
  public readonly BASE_PATH = apiRoutesConfig.authentication.root;
  public readonly RESET_PASSWORD_PATH = apiRoutesConfig.authentication.resetPassword;

  constructor(private readonly _httpService: HttpCrudService) {}

  public requestPasswordResetToken(
    passwordResetTokenRequest: PasswordResetTokenRequest
  ): Observable<PasswordResetTokenResponse> {
    return this._httpService
      .create<PasswordResetTokenRequest, PasswordResetTokenDto>(
        this.getFullPath(this.RESET_PASSWORD_PATH),
        passwordResetTokenRequest
      )
      .pipe(map(passResetTokenDtoToPasswordResetTokenResponse));
  }

  public requestPasswordTokenUser(token: string): Observable<PasswordTokenUserResponse> {
    return this._httpService
      .find<PasswordTokenUserDto>(`${this.getFullPath(this.RESET_PASSWORD_PATH)}/${token}`)
      .pipe(map(passwordTokenUserDtoToPasswordTokenUserResponse));
  }

  public resetPassword(
    resetPasswordRequest: ResetPasswordRequest
  ): Observable<HttpMessageResponse> {
    return this._httpService.patch<ResetPasswordRequest, HttpMessageResponse>(
      this.getFullPath(this.RESET_PASSWORD_PATH),
      resetPasswordRequest
    );
  }

  private getFullPath(path: string): string {
    return `${this.BASE_PATH}${path}`;
  }
}
