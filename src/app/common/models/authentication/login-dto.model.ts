import {isUserDto, UserDto} from "../user-dto.model";
import {KeysMap} from "../../../core/types";
import {ObjectUtils} from "../../../core/utils/object-util";

interface LoginDto {
  accessToken: string;
  refreshToken: string;
  user: UserDto;
}

const loginKeysMap: KeysMap<LoginDto, boolean> = {
  accessToken: true,
  refreshToken: true,
  user: true
};

function isLoginDto(value: unknown): value is LoginDto {
  return ObjectUtils.hasKeys(value, loginKeysMap) && isUserDto(value.user);
}

export {LoginDto, isLoginDto};
