import { AccountDto, isAccountDto } from './account-dto.model';
import { KeysMap } from '../../core/types';
import { ObjectUtils } from '../../core/utils';

interface UserDto {
  emailAddress: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  isVerified: boolean;
  account: AccountDto;
}

const userKeys: KeysMap<UserDto, boolean> = {
  emailAddress: true,
  firstName: true,
  lastName: true,
  phoneNumber: true,
  isVerified: true,
  account: true,
};

function isUserDto(value: unknown): value is UserDto {
  return ObjectUtils.hasKeys(value, userKeys) && isAccountDto(value.account);
}

export { UserDto, isUserDto };
