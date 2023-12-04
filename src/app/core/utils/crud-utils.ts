import { PageResponse } from '../types';
import { ObjectUtils } from './object-utils';

function isPageResponse<T>(value: PageResponse<unknown>): value is PageResponse<T> {
  return (
    ObjectUtils.isObject(value) &&
    'count' in value &&
    typeof value.count === 'number' &&
    'total' in value &&
    typeof value.total === 'number' &&
    'data' in value &&
    Array.isArray(value.data)
  );
}

const CrudUtils = {
  isPageResponse,
};

export { CrudUtils };
