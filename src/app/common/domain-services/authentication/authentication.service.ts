import {Inject, Injectable} from '@angular/core';
import {map, Observable, tap} from "rxjs";

import {HttpCrudService} from "../../../core/services";
import {
  LoginDto,
  LoginRequest,
  LoginResponse,
  RegisterRequest,
  UserAccessCredentials,
  UserDto,
  UserPrincipal,
  UserResponse
} from "../../domain-models";
import {apiRoutesConfig} from '../../config';
import {loginDtoToLoginResponse} from "../../mappers";
import {userDtoToUserResponse} from "../../mappers/authentication/authentication.mapper";
import {UserPrincipalStoreService} from "../user-principal-store/user-principal-store.service";
import {AccountVerificationStoreService} from "../account-verification-store/account-verification-store.service";

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  public readonly BASE_PATH = apiRoutesConfig.authentication.root;
  public readonly LOGIN_PATH = apiRoutesConfig.authentication.login;
  public readonly REGISTER_PATH = apiRoutesConfig.authentication.register;

  constructor(@Inject(HttpCrudService) private readonly httpService: HttpCrudService,
              @Inject(UserPrincipalStoreService) private readonly userPrincipalStore: UserPrincipalStoreService,
              @Inject(AccountVerificationStoreService) private readonly accountVerificationStore: AccountVerificationStoreService) {
  }

  public register(registerRequest: RegisterRequest): Observable<UserResponse> {
    return this.httpService.create<RegisterRequest, UserDto>(
      this.getFullPath(this.REGISTER_PATH), registerRequest
    ).pipe(
      map(userDtoToUserResponse),
      tap((userResponse) => {
          this.addAccountVerification(userResponse)
        }
      ));
  }

  public login(loginRequest: LoginRequest): Observable<LoginResponse> {
    return this.httpService.create<LoginRequest, LoginDto>(
      this.getFullPath(this.LOGIN_PATH), loginRequest)
      .pipe(map(loginDtoToLoginResponse),
        tap((loginResponse) => {
          this.addUserLogin(loginResponse)
        })
      );
  }

  private getFullPath(path: string): string {
    return `${this.BASE_PATH}${path}`;
  }

  private addUserLogin(userLogin: LoginResponse) {
    const user = userLogin.user;

    const userPrincipal: UserPrincipal = {
      ...user
    };

    const userCredentials: UserAccessCredentials = {
      username: user.username,
      accessToken: userLogin.accessToken,
      refreshToken: userLogin.refreshToken
    }

    this.userPrincipalStore.userPrincipal = userPrincipal;
    this.userPrincipalStore.userCredentials = userCredentials;
    this.addAccountVerification(user);
  }

  private addAccountVerification(user: UserResponse): void {
    const isVerified = user.isVerified;

    if (isVerified) {
      return;
    }

    this.accountVerificationStore.accountVerification = {
      username: user.username,
      emailAddress: user.emailAddress,
      isVerified
    };
  }
}