import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { Mapper } from '@dynamic-mapper/angular';
import {
  AccountVerificationStoreService,
  UserAccessCredentials,
  UserPrincipal,
  UserPrincipalStoreService,
} from '../../../core';
import { ApiCrudClient } from '../../../common';
import { MappingProfile } from '../../config';
import {
  LoginDto,
  LoginRequest,
  LoginResponse,
  RegisterRequest,
  User,
  UserDto,
} from '../../models';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  constructor(
    private readonly _apiCrudClient: ApiCrudClient,
    private readonly _mapper: Mapper,
    private readonly _userPrincipalStore: UserPrincipalStoreService,
    private readonly _accountVerificationStore: AccountVerificationStoreService
  ) {}

  public register(registerRequest: RegisterRequest): Observable<User> {
    return this._apiCrudClient
      .create<RegisterRequest, UserDto, User>(
        'register',
        registerRequest,
        MappingProfile.UserDtoToUser
      )
      .pipe(tap((user) => this.addAccountVerification(user)));
  }

  public login(loginRequest: LoginRequest): Observable<LoginResponse> {
    return this._apiCrudClient
      .create<LoginRequest, LoginDto, LoginResponse>(
        'login',
        loginRequest,
        MappingProfile.LoginDtoToLoginResponse
      )
      .pipe(tap((loginResponse) => this.addUserLogin(loginResponse)));
  }

  private addUserLogin(userLogin: LoginResponse) {
    const user = userLogin.user;

    const userPrincipal: UserPrincipal = this._mapper.map(MappingProfile.UserToUserPrincipal, user);

    const accessCredentials: UserAccessCredentials = this._mapper.map(
      MappingProfile.LoginResponseToUserAccessCredentials,
      userLogin
    );

    this._userPrincipalStore.next(userPrincipal);
    this._userPrincipalStore.accessCredentials = accessCredentials;
    this.addAccountVerification(user);
  }

  private addAccountVerification(user: User): void {
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
