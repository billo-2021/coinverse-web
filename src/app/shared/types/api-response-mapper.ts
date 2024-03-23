export type ApiResponseMapper<TDto, TResponse = TDto> = (response: TDto) => TResponse;
