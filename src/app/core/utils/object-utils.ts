import { KeysMap, ObjectKeysMap } from '../types';

function hasKeys<T extends object>(value: unknown, keysMap: KeysMap<T, boolean>): value is T {
  return (
    typeof value === 'object' &&
    value != null &&
    (Object.keys(keysMap) as (keyof typeof keysMap)[]).every((key) => keysMap[key] && key in value)
  );
}

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

const ObjectUtils = {
  map,
  hasKeys,
  isObject,
};

export { ObjectUtils };
