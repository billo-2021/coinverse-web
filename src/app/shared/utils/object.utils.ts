import { None, ObjectKeysMap } from '../types';

function map<A extends object, B extends object>(keysMap: ObjectKeysMap<A, B>, a: A): B {
  return (Object.keys(keysMap) as (keyof typeof keysMap)[]).reduce((prev, currValue) => {
    return {
      ...prev,
      [currValue]: a[currValue],
    };
  }, {} as B) as B;
}

function isObject(value: unknown): value is object {
  return value != null || typeof value === 'object';
}

type BaseType = 'string' | 'boolean' | 'number';
type ObjectType = { [Key: string]: BaseType | ArrayType | ObjectType };
type ArrayType = Array<BaseType | ObjectType | ArrayType>;

type BaseMapType = string | boolean | number;
type ObjectMapType = { [Key: string]: BaseMapType | ArrayMapType | ObjectMapType };
type ArrayMapType = Array<BaseMapType | ObjectMapType | ArrayMapType>;

function nameof<T extends { [Key: string]: unknown }, K extends keyof T>(_obj: T, key: K): K {
  return key;
}

function isNone<T>(value: T | None): value is None {
  return value === null || typeof value == 'undefined';
}

function keys<T extends object>(obj: T): Array<keyof T> {
  return Object.keys(obj) as Array<keyof T>;
}

export const ObjectUtils = {
  map,
  isObject,
  nameof,
  isNone,
  keys,
} as const;
