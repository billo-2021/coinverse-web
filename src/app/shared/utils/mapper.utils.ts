import { PageResponse } from '../types';

function apiResponseMapper<TDto, TResponse = TDto>(response: TDto): TResponse;

function apiResponseMapper<TDto, TResponse = TDto>(response: TDto[]): TResponse[];

function apiResponseMapper<TDto, TResponse = TDto>(
  response: PageResponse<TDto>
): PageResponse<TResponse>;
function apiResponseMapper<TDto, TResponse = TDto>(
  response: TDto | TDto[] | PageResponse<TDto>
): TResponse | TResponse[] | PageResponse<TResponse> {
  return response as unknown as TResponse | TResponse[] | PageResponse<TResponse>;
}

export const MapperUtils = {
  apiResponseMapper,
} as const;
