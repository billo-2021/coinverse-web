import { ApiResponseMapper } from '../types';

export function apiResponseMapper<TDto, TResponse>(): ApiResponseMapper<TDto, TResponse> {
  return {
    map: (response: unknown) => response as TResponse,
  };
}

export const MapperUtils = {
  apiResponseMapper,
};
