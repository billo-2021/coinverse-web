import {KeysMap} from "../../core/types";
import {ObjectUtils} from "../../core/utils";

interface AccountDto {
  username: string;
  isVerified: boolean;
  roles: string[];
}

const accountKeys: KeysMap<AccountDto, boolean> = {
  username: true,
  isVerified: true,
  roles: true
};

function isAccountDto(value: unknown): value is AccountDto {
  return (ObjectUtils.hasKeys(value, accountKeys));
}

export {AccountDto, isAccountDto};
