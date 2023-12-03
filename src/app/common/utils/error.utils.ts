import { Log } from '../../core/types';
import { ApiError, AppError } from '../../core/models';

export function isKnownError(error: unknown): error is Error | ApiError | AppError {
  return error instanceof Error || error instanceof AppError || error instanceof AppError;
}

export function isKnownErrorLog(log: Log): boolean {
  return (
    log.type === 'error' && (log.options instanceof ApiError || log.options instanceof AppError)
  );
}
