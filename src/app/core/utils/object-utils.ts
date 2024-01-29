import { ObjectKeysMap } from '../types';

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

const ObjectUtils = {
  map,
  isObject,
  nameof,
};

export { ObjectUtils };
