import {LoginDto, LoginResponse, UserDto, UserResponse} from '../../models';
import {ObjectUtils} from '../../../core/utils/object-util';
import {ObjectKeysMap} from '../../../core/types';
import {AccountDto} from "../../models/account-dto.model";
import {AccountResponse} from '../../models/account-response.model';

type LoginKeys = 'accessToken' | 'refreshToken';
type UserKeys = 'emailAddress' | 'firstName' | 'lastName';


type LoginDtoType = Pick<LoginDto, LoginKeys>;
type LoginResponseType = Pick<LoginResponse, LoginKeys>;
type UserDtoType = Pick<UserDto, UserKeys>;
type UserResponseType = Pick<UserResponse, UserKeys>;

function loginDtoToLoginResponse(loginDto: LoginDto): LoginResponse {
  const userDto = loginDto.user;
  const accountDto = userDto.account;

  const accountKeysMap: ObjectKeysMap<AccountDto, AccountResponse> = {
    username: 'username',
    roles: 'roles'
  }

  const userKeysMap: ObjectKeysMap<UserDtoType, UserResponseType> = {
    emailAddress: 'emailAddress',
    firstName: 'firstName',
    lastName: 'lastName'
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

export {loginDtoToLoginResponse};
