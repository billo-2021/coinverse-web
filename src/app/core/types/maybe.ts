import {isNone, None} from './none';
import {Nullable} from "./nullable";

type Nothing = Extract<None, null | undefined>;

type Maybe<T> = T | Nothing;

function of<T extends unknown>(value: T): Maybe<T> {
  return value ?? undefined;
}

function isNothing<T>(maybe: Maybe<T>): maybe is Nothing {
  return maybe === null || maybe == undefined;
}

function isSome<T>(maybe: Maybe<T>): maybe is T {
  return maybe !== null && maybe !== undefined;
}

const nothing = undefined;

function andThen<T>(fn: (value: NonNullable<T>) => void, nullable: Nullable<T>): void {
  if (isNone(nullable)) {
    return;
  }

  fn(nullable as NonNullable<T>);
}

const Maybe = {
  of,
  isNothing,
  isSome,
  nothing,
  andThen
}

export {Maybe};
