import {Inject, Injectable} from '@angular/core';
import {HttpCrudService} from "../../../core/services";
import {apiRoutesConfig} from "../../config";
import {
  PasswordResetTokenDto,
  PasswordResetTokenRequest,
  PasswordResetTokenResponse,
  PasswordTokenUserDto,
  PasswordTokenUserResponse,
  ResetPasswordRequest
} from "../../domain-models";
import {HttpMessageResponse} from "../../../core/types";
import {map, Observable} from "rxjs";
import {
  passResetTokenDtoToPasswordResetTokenResponse,
  passwordTokenUserDtoToPasswordTokenUserResponse
} from "../../mappers/authentication/authentication.mapper";

@Injectable({
  providedIn: 'root'
})
export class PasswordResetService {
  public readonly BASE_PATH = apiRoutesConfig.authentication.root;
  public readonly RESET_PASSWORD_PATH = apiRoutesConfig.authentication.resetPassword;

  constructor(@Inject(HttpCrudService) private readonly httpService: HttpCrudService) {
  }

  public requestPasswordResetToken(passwordResetTokenRequest: PasswordResetTokenRequest): Observable<PasswordResetTokenResponse> {
    return this.httpService.create<PasswordResetTokenRequest, PasswordResetTokenDto>(
      this.getFullPath(this.RESET_PASSWORD_PATH), passwordResetTokenRequest
    ).pipe(map(passResetTokenDtoToPasswordResetTokenResponse));
  }

  public requestPasswordTokenUser(token: string): Observable<PasswordTokenUserResponse> {
    return this.httpService.find<PasswordTokenUserDto>(
      `${this.getFullPath(this.RESET_PASSWORD_PATH)}/${token}`,
    ).pipe(map(passwordTokenUserDtoToPasswordTokenUserResponse))
  }

  public resetPassword(resetPasswordRequest: ResetPasswordRequest): Observable<HttpMessageResponse> {
    return this.httpService.patch<ResetPasswordRequest, HttpMessageResponse>(
      this.getFullPath(this.RESET_PASSWORD_PATH), resetPasswordRequest
    );
  }

  private getFullPath(path: string): string {
    return `${this.BASE_PATH}${path}`;
  }
}
