import { SimpleChange, SimpleChanges } from '@angular/core';

declare global {
  interface ObjectConstructor {
    typedKeys<T>(obj: T): Array<keyof T>;
  }
}

Object.typedKeys = Object.keys as any;

export type SimpleChangeTyped<T> = Omit<
  SimpleChange,
  SimpleChange['previousValue'] | SimpleChange['currentValue']
> & {
  previousValue: T;
  currentValue: T;
};

export type SimpleChangesTyped<T> = Omit<SimpleChanges, keyof T> & {
  [K in keyof T]: SimpleChangeTyped<T[K]>;
};

export function getUpdatedChanges<T extends Object>(changes: SimpleChangesTyped<T>): Partial<T> {
  return Object.typedKeys(changes).reduce((prev, curr) => {
    const currentChangeValue = changes[curr].currentValue;
    const previousChangeValue = changes[curr].previousValue;

    return currentChangeValue !== previousChangeValue
      ? { ...prev, [`${String(curr)}`]: currentChangeValue }
      : { ...prev };
  }, {} as Partial<T>);
}
