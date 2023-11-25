import { Injectable } from '@angular/core';
import { map, Observable, tap } from 'rxjs';

import { HttpCrudService } from '../../../core/services';
import {
  LoginDto,
  LoginRequest,
  LoginResponse,
  RegisterRequest,
  UserAccessCredentials,
  UserDto,
  UserPrincipal,
  UserResponse,
} from '../../domain-models';
import { apiRoutesConfig } from '../../config';
import { loginDtoToLoginResponse } from '../../mappers';
import { userDtoToUserResponse } from '../../mappers/authentication/authentication.mapper';
import { AccountVerificationStoreService, UserPrincipalStoreService } from '../../services';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  public readonly BASE_PATH = apiRoutesConfig.authentication.root;
  public readonly LOGIN_PATH = apiRoutesConfig.authentication.login;
  public readonly REGISTER_PATH = apiRoutesConfig.authentication.register;

  constructor(
    private readonly _httpService: HttpCrudService,
    private readonly _userPrincipalStore: UserPrincipalStoreService,
    private readonly _accountVerificationStore: AccountVerificationStoreService
  ) {}

  public register(registerRequest: RegisterRequest): Observable<UserResponse> {
    return this._httpService
      .create<RegisterRequest, UserDto>(this.getFullPath(this.REGISTER_PATH), registerRequest)
      .pipe(
        map(userDtoToUserResponse),
        tap((userResponse) => {
          this.addAccountVerification(userResponse);
        })
      );
  }

  public login(loginRequest: LoginRequest): Observable<LoginResponse> {
    return this._httpService
      .create<LoginRequest, LoginDto>(this.getFullPath(this.LOGIN_PATH), loginRequest)
      .pipe(
        map(loginDtoToLoginResponse),
        tap((loginResponse) => {
          this.addUserLogin(loginResponse);
        })
      );
  }

  private getFullPath(path: string): string {
    return `${this.BASE_PATH}${path}`;
  }

  private addUserLogin(userLogin: LoginResponse) {
    const user = userLogin.user;

    const userPrincipal: UserPrincipal = {
      ...user,
    };

    const accessCredentials: UserAccessCredentials = {
      username: user.username,
      accessToken: userLogin.accessToken,
      refreshToken: userLogin.refreshToken,
    };

    this._userPrincipalStore.next(userPrincipal);
    this._userPrincipalStore.accessCredentials = accessCredentials;
    this.addAccountVerification(user);
  }

  private addAccountVerification(user: UserResponse): void {
    const isVerified = user.isVerified;

    if (isVerified) {
      return;
    }

    this._accountVerificationStore.next({
      username: user.username,
      emailAddress: user.emailAddress,
      isVerified,
    });
  }
}
