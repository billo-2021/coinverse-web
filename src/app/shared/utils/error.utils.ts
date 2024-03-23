import { ApiError, AppError } from '../models';
import { Log } from '../types';

function isKnownError(error: unknown): error is Error | ApiError | AppError {
  return error instanceof Error || error instanceof AppError || error instanceof AppError;
}

function isKnownErrorLog(log: Log): boolean {
  return (
    log.type === 'error' && (log.options instanceof ApiError || log.options instanceof AppError)
  );
}

function getErrorMessage(error: unknown): string {
  if (error instanceof ApiError) {
    return error.message;
  }

  throw error;
}

export const ErrorUtils = {
  isKnownError,
  isKnownErrorLog,
  getErrorMessage,
} as const;
