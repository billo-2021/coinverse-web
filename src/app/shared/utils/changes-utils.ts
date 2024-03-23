import { SimpleChangesTyped } from '../types';
import { ObjectUtils } from './object.utils';

function getUpdatedChanges<T extends object>(changes: SimpleChangesTyped<T>): Partial<T> {
  return ObjectUtils.keys(changes).reduce((prev, curr) => {
    const currentChangeValue = changes[curr].currentValue;
    const previousChangeValue = changes[curr].previousValue;

    return currentChangeValue !== previousChangeValue
      ? { ...prev, [`${String(curr)}`]: currentChangeValue }
      : { ...prev };
  }, {} as Partial<T>);
}

export const ChangeUtils = {
  getUpdatedChanges,
} as const;
