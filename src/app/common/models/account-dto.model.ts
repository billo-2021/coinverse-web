import {KeysMap} from "../../core/types";
import {ObjectUtils} from "../../core/utils/object-util";

interface AccountDto {
  username: string;
  roles: string[];
}

const accountKeys: KeysMap<AccountDto, boolean> = {
  username: true,
  roles: true
};

function isAccountDto(value: unknown): value is AccountDto {
  return (ObjectUtils.hasKeys(value, accountKeys));
}

export {AccountDto, isAccountDto};
