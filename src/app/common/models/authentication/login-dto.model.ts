import {isUserDto, UserDto} from "../user-dto.model";

interface LoginDto {
  accessToken: string;
  refreshToken: string;
  user: UserDto;
}

const loginDtoKeys = ['accessToken', 'refreshToken', 'user'] as const;

type LoginKey = keyof LoginDto;

function hasProperty<T>(obj: unknown, key: string): obj is T {

  return obj === 'object' && obj != null && key in obj;
}

type is = Record<keyof LoginDto, boolean>;

type isn = Partial<LoginDto>;

function hasKeys<T extends object, K extends keyof T>(value: unknown, keys: K[]): value is T {
  return typeof value === 'object' && value != null &&
    keys.every((key) => key in value);
}

function map<A extends object, B extends object, K extends keyof A>(
  keysMap: {[Property in keyof A]: keyof B},
  a: A): B {

  return (Object.keys(a) as (keyof typeof a)[]).reduce((prev, currValue) => {
    return {
      ...prev,
      [keysMap[currValue]]: a[currValue]
    }
  }, {} as B);
}

  const mapObject = keys.reduce((prev, currKey) => {
    if (!(currKey in a)) {
      return prev;
    }

    if (typeof a[c])
    return {
      ...prev,
      [currKey]: (a as any)[currKey]
    };
  }, {})
  return (keys.reduce((prev, currKey) => {
    if (!(currKey in a)) {
      return prev;
    }

    return {
      ...prev,
      [currKey]: (a as any)[currKey]
    };
  }, {}) as K);
}

hasKeys<LoginDto, keyof LoginDto>(me, ['accessToken', 'refreshToken'])

function isLoginDto(value: unknown, a: Partial<LoginDto>): value is LoginDto {
  // return (value === 'object' && value != null &&
  //     Object.keys(value).every()
  // )
  return (
    typeof value === 'object' && value != null &&
    'accessToken' in value && 'refreshToken' in value &&
    'refreshToken' in value && 'user' in value && isUserDto(value.user)
  );
}

export {LoginDto, isLoginDto};
