import { isNone, None } from './none';
import { Mapper } from './mapper';
import { ValueTypeIs } from './when';

type Nothing = Extract<None, null>;

type Nullable<T> = T | Nothing;

function of<T extends unknown>(value: T): Nullable<T> {
  return value ?? null;
}

function isSome<T>(nullable: Nullable<T>): nullable is T {
  return nullable !== null && nullable !== undefined;
}

function isNotNull<T>(nullable: Nullable<T>): nullable is NonNullable<T> {
  return nullable !== null && nullable !== undefined;
}

const nothing = null;

function withDefault<T>(defaultValue: NonNullable<T>, nullable: Nullable<T>): T {
  return isNotNull(nullable) ? nullable : defaultValue;
}

function map<A, B>(mapper: Mapper, nullable: Nullable<A>): Nullable<B> {
  if (isNone(nullable)) {
    return nothing;
  }

  return mapper(nullable);
}

function andThen<T>(fn: (value: NonNullable<T>) => void, nullable: Nullable<T>): void {
  if (isNone(nullable)) {
    return;
  }

  fn(nullable as NonNullable<T>);
}

function getWhenValueTypeIs<T>(nullable: Nullable<unknown>, valueTypeIs: ValueTypeIs<T>): Nullable<T> {
  if (isNone(nullable) || !valueTypeIs(nullable)) {
    return nothing;
  }

  return nullable;
}

const Nullable = {
  of,
  isNone,
  isSome,
  map,
  getWhenValueTypeIs,
  nothing,
  withDefault,
  andThen,
};

export { Nullable };
