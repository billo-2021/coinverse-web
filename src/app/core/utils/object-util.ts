import {KeysMap, ObjectKeysMap} from "../types";

function hasKeys<T extends object>(value: unknown, keysMap: KeysMap<T, boolean>): value is T {
  return typeof value === 'object' && value != null &&
    (Object.keys(keysMap) as (keyof typeof keysMap)[]).every((key) =>
      keysMap[key] && key in value);
}

function map<A extends object, B extends object>(
  keysMap: ObjectKeysMap<A, B>,
  a: A): B {

  return (Object.keys(a) as (keyof typeof a)[]).reduce((prev, currValue) => {
    return {
      ...prev,
      [keysMap[currValue]]: a[currValue]
    }
  }, {} as B);
}

const ObjectUtils = {
  map,
  hasKeys
}

export {ObjectUtils, ObjectKeysMap, KeysMap};
