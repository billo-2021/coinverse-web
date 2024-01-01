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

type BaseType = 'string' | 'boolean' | 'number';
type ObjectType = { [Key: string]: BaseType | ArrayType | ObjectType };
type ArrayType = Array<BaseType | ObjectType | ArrayType>;
type NullType = 'null';
type UndefinedType = 'undefined';
type NullOrUndefinedType = NullType | UndefinedType;

function isBase(value: unknown): value is string | boolean | number {
  return typeof value === 'string' || typeof value === 'boolean' || typeof value === 'number';
}

function isBaseConfig(config: unknown): config is BaseType {
  return config === 'string' || config === 'boolean' || config === 'number';
}

function isObjectT(value: unknown): value is { [Key: string]: unknown } {
  return typeof value === 'object' && value !== null && !!Object.keys(value).length;
}

function isObjectConfig(config: unknown): config is ObjectType {
  return typeof config === 'object' && config !== null && !!Object.keys(config).length;
}

function isArrayType(value: unknown): value is Array<unknown> {
  return Array.isArray(value);
}

function isArrayConfig(config: unknown): config is ArrayType {
  return Array.isArray(config);
}

function isNullType(value: unknown): value is null {
  return value === null;
}

function isNullConfig(config: unknown): config is NullType {
  return config === null;
}

function isUndefinedType(value: unknown): value is undefined {
  return typeof value === 'undefined';
}

function isUndefinedConfig(config: unknown): config is UndefinedType {
  return typeof config === 'undefined';
}

function isNullOrUndefinedType(value: unknown): value is NullOrUndefinedType {
  return isNullType(value) || isUndefinedType(value);
}

function isNullOrUndefinedConfig(config: unknown): config is NullOrUndefinedType {
  return isNullType(config) || isUndefinedType(config);
}

function isOfType<TConfig extends BaseType | ObjectType | ArrayType, TResult>(
  value: unknown,
  typeConfig: TConfig
): value is TResult {
  return validateType(value, typeConfig);
}

function hasKey(
  value: { [Key: string]: unknown },
  key: keyof ObjectType
): key is keyof typeof value {
  return isObjectT(value) && key in value;
}

function validateType<TConfig extends BaseType | ObjectType | ArrayType, TResult>(
  value: unknown,
  typeConfig: TConfig
): value is TResult {
  if (isBaseConfig(typeConfig) || isNullOrUndefinedConfig(typeConfig)) {
    return typeof value === typeConfig;
  }

  if (isArrayConfig(typeConfig)) {
    if (!isArrayType(value)) {
      return false;
    }

    if (!typeConfig.length || !value.length) {
      return true;
    }

    if (typeConfig.length !== value.length) {
      return false;
    }

    return typeConfig.every((type, index) => validateType(value[index], type));
  }

  return (Object.keys(typeConfig) as Array<keyof ObjectType>).every((key) => {
    if (!isObjectT(value) || !hasKey(value, key)) {
      return false;
    }

    return validateType(value[key], typeConfig[key]);
  });
}

type BaseMapType = string | boolean | number;
type ObjectMapType = { [Key: string]: BaseMapType | ArrayMapType | ObjectMapType };
type ArrayMapType = Array<BaseMapType | ObjectMapType | ArrayMapType>;
type NullMapType = null;
type UndefinedMapType = undefined;
type NullOrUndefinedMapType = NullMapType | UndefinedMapType;

// type MapConfigType<
//   A extends BaseMapType | ObjectMapType,
//   B extends BaseMapType | ObjectMapType,
// > = B extends ObjectMapType
//   ? KeysMap<A, B>
//   : B extends BaseMapType
//     ? B extends A
//       ? undefined
//       : never
//     : never;
//
// type KeysMap<A, B> = {
//   [Key in keyof A]: A[Key] extends ObjectMapType
//     ? KeysMap<A[Key], B[keyof B]>
//     : A[Key] extends B[keyof B]
//       ? keyof B
//       : never;
// };

function isBaseType<T extends BaseType>(value: unknown): value is T {
  return isBase(value);
}

type MapType = BaseMapType | ObjectMapType | ArrayMapType;

type ValueType<A, B> = B extends BaseMapType & B ? B : B extends BaseMapType ? never : A;

// function mapType<A extends BaseMapType | ObjectMapType, B extends BaseMapType | ObjectMapType>(
//   value: ValueType<A, B>,
//   mapConfig?: MapConfigType<A, B>
// ): B {
//   if (isBase(value) || typeof mapConfig === 'undefined') {
//     return value as B;
//   }
//
//   if (isObjectT(value)) {
//     const t = {} as typeof value;
//
//     (Object.keys(value) as Array<keyof A>).reduce((acc, key) => {
//       const configKey = mapConfig[key];
//       const keyValue = (value as A)[key];
//
//       const result = typeof keyValue === 'object' ? mapType(keyValue, configKey) : keyValue;
//
//       return { ...acc, [key]: result };
//     }, {} as A);
//   }
//
//   return value;
// }

const ObjectUtils = {
  map,
  hasKeys,
  isObject,
};

export { ObjectUtils };
