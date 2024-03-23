import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { Mapper } from '@dynamic-mapper/angular';
import {
  AccountVerificationStore,
  ApiCrudClient,
  ApiRoute,
  UserAccessCredentials,
  UserPrincipal,
  UserPrincipalStore,
} from '../../../shared';
import {
  LoginDto,
  LoginRequest,
  LoginResponse,
  RegisterRequest,
  User,
  UserDto,
} from '../../models';
import { MappingProfile } from '../../config';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  constructor(
    private readonly _apiCrudClient: ApiCrudClient,
    private readonly _mapper: Mapper,
    private readonly _userPrincipalStore: UserPrincipalStore,
    private readonly _accountVerificationStore: AccountVerificationStore
  ) {}

  public register(registerRequest: RegisterRequest): Observable<User> {
    return this._apiCrudClient
      .create<RegisterRequest, UserDto, User>(
        ApiRoute.REGISTER,
        registerRequest,
        MappingProfile.UserDtoToUser
      )
      .pipe(tap((user) => this.addAccountVerification(user)));
  }

  public login(loginRequest: LoginRequest): Observable<LoginResponse> {
    return this._apiCrudClient
      .create<LoginRequest, LoginDto, LoginResponse>(
        ApiRoute.LOGIN,
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
