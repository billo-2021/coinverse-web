import {
  LoginDto,
  LoginResponse,
  PasswordResetTokenDto,
  PasswordResetTokenResponse,
  PasswordTokenUserDto,
  PasswordTokenUserResponse,
  UserDto,
  UserResponse
} from '../../domain-models';
import {ObjectUtils} from '../../../core/utils';
import {ObjectKeysMap} from '../../../core/types';
import {AccountDto} from "../../domain-models/account-dto.model";
import {AccountResponse} from '../../domain-models/account-response.model';

type LoginKeys = 'accessToken' | 'refreshToken';
type UserKeys = 'emailAddress' | 'firstName' | 'lastName' | 'phoneNumber' | 'isVerified';


type LoginDtoType = Pick<LoginDto, LoginKeys>;
type LoginResponseType = Pick<LoginResponse, LoginKeys>;
type UserDtoType = Pick<UserDto, UserKeys>;
type UserResponseType = Pick<UserResponse, UserKeys>;

function loginDtoToLoginResponse(loginDto: LoginDto): LoginResponse {
  const userDto = loginDto.user;
  const accountDto = userDto.account;

  const accountKeysMap: ObjectKeysMap<AccountDto, AccountResponse> = {
    username: 'username',
    isVerified: 'isVerified',
    roles: 'roles'
  }

  const userKeysMap: ObjectKeysMap<UserDtoType, UserResponseType> = {
    emailAddress: 'emailAddress',
    firstName: 'firstName',
    lastName: 'lastName',
    phoneNumber: 'phoneNumber',
    isVerified: 'isVerified'
  }

  const loginKeysMap: ObjectKeysMap<LoginDtoType, LoginResponseType> = {
    accessToken: 'accessToken',
    refreshToken: 'refreshToken'
  }

  const accountResponse = ObjectUtils.map(accountKeysMap, accountDto);
  const userResponse = ObjectUtils.map(userKeysMap, userDto);
  const loginResponse = ObjectUtils.map(loginKeysMap, loginDto);

  return {
    ...loginResponse,
    user: {
      ...userResponse,
      ...accountResponse
    }
  };
}

function userDtoToUserResponse(userDto: UserDto): UserResponse {
  const accountDto = userDto.account;

  const accountKeysMap: ObjectKeysMap<AccountDto, AccountResponse> = {
    username: 'username',
    isVerified: 'isVerified',
    roles: 'roles'
  }

  const userKeysMap: ObjectKeysMap<UserDtoType, UserResponseType> = {
    emailAddress: 'emailAddress',
    firstName: 'firstName',
    lastName: 'lastName',
    phoneNumber: 'phoneNumber',
    isVerified: 'isVerified'
  }

  const accountResponse = ObjectUtils.map(accountKeysMap, accountDto);
  const userResponse = ObjectUtils.map(userKeysMap, userDto);

  return {
    ...userResponse,
    ...accountResponse
  };
}

function passwordTokenUserDtoToPasswordTokenUserResponse(passwordTokenUserDto: PasswordTokenUserDto): PasswordTokenUserResponse {
  const passwordTokenUserKeys: ObjectKeysMap<PasswordTokenUserDto, PasswordTokenUserResponse> = {
    username: 'username',
    emailAddress: 'emailAddress'
  };

  return ObjectUtils.map(passwordTokenUserKeys, passwordTokenUserDto);
}

function passResetTokenDtoToPasswordResetTokenResponse(passwordResetTokenDto: PasswordResetTokenDto): PasswordResetTokenResponse {
  const passResetTokenKeys: ObjectKeysMap<PasswordResetTokenDto, PasswordResetTokenResponse> = {
    username: 'username',
    emailAddress: 'emailAddress'
  };

  return ObjectUtils.map(passResetTokenKeys, passwordResetTokenDto);
}

export {
  loginDtoToLoginResponse,
  userDtoToUserResponse,
  passwordTokenUserDtoToPasswordTokenUserResponse,
  passResetTokenDtoToPasswordResetTokenResponse
};
