import { SimpleChanges } from '@angular/core';
import { SimpleChangeTyped } from './simple-change-typed';

export type SimpleChangesTyped<T> = Omit<SimpleChanges, keyof T> & {
  [K in keyof T]?: SimpleChangeTyped<T[K]>;
};
