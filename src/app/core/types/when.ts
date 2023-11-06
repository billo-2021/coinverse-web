import { None } from './none';

type ValueTypeIs<T> = (value: unknown | None) => value is T;

function whenValueTypeIs<A, B>(whenValueTypeIs: ValueTypeIs<A>, value: A | None, m: (a: A) => B): B {
  if (!whenValueTypeIs(value)) {
    throw new Error('Invalid value');
  }

  return m(value);
}

const When = {
  whenValueTypeIs,
};

export { ValueTypeIs, When };
