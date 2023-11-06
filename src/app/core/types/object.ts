export type ObjectKeysMap<K extends object, V> = {
  [Property in keyof K]: keyof V;
};

export type KeysMap<K extends object, V> = {
  [Property in keyof K]: V;
};

type ColumnType<SelectType> = {
  readonly __select__: SelectType;
};

type IfNotNever<T, K> = T extends never ? never : K;

type NonNeverSelectKeys<R> = {
  [K in keyof R]: IfNotNever<R[K], K>;
}[keyof R];

type Selectable<R> = {
  [K in NonNeverSelectKeys<R>]: R[K];
};

type DrainOuterGeneric<T> = [T] extends [unknown] ? T : never;

type AnyProperty<T, TP extends keyof T> = DrainOuterGeneric<
  {
    [Y in TP]: keyof T[Y];
  }[TP] &
    string
>;

type ExtractPropertyType<Type, TypeKey extends keyof Type, C> = {
  [T in TypeKey]: C extends keyof Type[T] ? Type[T][C] : never;
}[TypeKey];

type SelectExpression<Type, TypeKey extends keyof Type> = AnyProperty<Type, TypeKey>;

type SelectArg<Type, TypeKey extends keyof Type, SE extends SelectExpression<Type, TypeKey>> = SE;

type Selecton<Type, TypeKey extends keyof Type, SE extends SelectExpression<Type, TypeKey>> = {
  [A in NonNeverSelectKeys<SE>]: IfNotNever<SE[A], A>;
};

// function select<SE extends SelectExpression<Type, TypeKey>,
// Type, TypeKey extends keyof Type>(selection: SelectArg<Type, TypeKey, SE>): Selection<Type, TypeKey, SE> {
//
// }

interface User {
  account: Account;
  role: Role;
}

interface Account {
  username: string;
  password: string;
}

interface Role {
  id: number;
  authority: string;
  description: string;
}

type UserType = ColumnType<User>;
type R = NonNeverSelectKeys<User>;
type D = Selectable<User>;
type E = AnyProperty<User, 'account' | 'role'>;
type F = ExtractPropertyType<User, 'account', 'username'>;
type test = Selecton<User, 'account', 'username'>;
