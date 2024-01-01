export type ApiValidationResult<T> = (
  response: unknown
) => { isValid: true; response: T } | { isValid: false; expected: string };

export type ApiResponseMapper<TDto = void, TResponse = TDto> =
  | {
      validate: undefined;
      map: (response: TDto) => TResponse;
    }
  | {
      validate: ApiValidationResult<TDto>;
      map: (response: TDto) => TResponse;
    };
