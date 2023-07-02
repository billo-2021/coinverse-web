import {curry} from 'ramda';

enum MaybeType {
  Just = 'maybe-type__just',
  Nothing = 'maybe-type__nothing'
}

interface Just<T> {
  type: typeof MaybeType.Just,
  value: T
}

interface Nothing {
  type: typeof MaybeType.Nothing
}

type Maybe<T> = Just<T> | Nothing

const Just = <T>(value: T): Just<T> => ({
  type: MaybeType.Just,
  value,
});

const Nothing = (): Nothing => ({
  type: MaybeType.Nothing
})

const maybeIsJust = <T>(m: Maybe<T>): boolean => m.type === MaybeType.Just;

const maybeIsNothing = <T>(m: Maybe<T>): boolean => m.type === MaybeType.Nothing;

function maybeMap<A, B>(f: (val: A) => Maybe<B>, m: Maybe<A>): Maybe<B> {
  switch (m.type) {
    case MaybeType.Nothing:
      return Nothing();
    case MaybeType.Just:
      return f(m.value);
  }
}

function maybeAndThen<A, B>(f: (val: A) => Maybe<B>, m: Maybe<A>) {
  switch (m.type) {
    case MaybeType.Nothing:
      return Nothing();
    case MaybeType.Just:
      return f(m.value);
  }
}

function maybeOf<T>(value: T): Maybe<T> {
  return value === undefined || value === null ?
    Nothing() :
    Just(value);
}

function maybeWithDefault<T>(defaultVal: T, m: Maybe<T>): T {
  switch (m.type) {
    case MaybeType.Nothing:
      return defaultVal;
    case MaybeType.Just:
      return m.value;
  }
}

function maybeIsPresent<T>(m: Maybe<T>): boolean {
  switch (m.type) {
    case MaybeType.Nothing:
      return false;
    case MaybeType.Just:
      return true;
  }
}

function maybeGet<T>(m: Maybe<T>): T {
  switch (m.type) {
    case MaybeType.Nothing:
      throw new Error("No such element");
    case MaybeType.Just:
      return m.value;
  }
}

const Maybe = {
  // andThen: curry(maybeAndThen),
  map: curry(maybeMap),
  of: maybeOf,
  withDefault: curry(maybeWithDefault),
  isJust: maybeIsJust,
  isNothing: maybeIsNothing,
  isPreset: maybeIsPresent,
  get: maybeGet
}

export {Maybe, Just, Nothing};

// type Maybe<T> = NonNullable<T> | undefined;
//
// function convertToMaybe<T extends unknown>(value: T): Maybe<T> {
//   return value ?? undefined;
// }
