import { ApiErrorDto } from '../models';

function isApiErrorDto(apiError: unknown): apiError is ApiErrorDto {
  return (
    !!apiError &&
    typeof apiError === 'object' &&
    'timeStamp' in apiError &&
    'code' in apiError &&
    'message' in apiError
  );
}

export const ApiValidators = { isApiErrorDto } as const;
