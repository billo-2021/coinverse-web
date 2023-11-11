import { ApiErrorDto } from "../models";

export function isApiErrorDto(apiError: unknown): apiError is ApiErrorDto {
  return !!apiError
    && typeof apiError === 'object'
    && 'timeStamp' in apiError
    && 'code' in apiError
    && 'message' in apiError;
}
