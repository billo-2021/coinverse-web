import { ErrorHandler, Injectable } from '@angular/core';
import { ApiError, apiErrorCodes, apiErrorMessages, ErrorUtils, LogState } from '../../../shared';

@Injectable({
  providedIn: 'root',
})
export class GlobalErrorHandlerService implements ErrorHandler {
  public constructor(private logState: LogState) {}

  public handleError(error: unknown): void {
    if (!(error instanceof ApiError)) {
      console.error(error);
    }

    if (error instanceof ApiError) {
      console.warn('Caught by error handler ', error);
    }

    if (ErrorUtils.isKnownError(error)) {
      this.logState.next({ type: 'error', message: error.message, options: error });
      return;
    }

    this.logState.next({
      type: 'error',
      message: apiErrorMessages[apiErrorCodes.SOMETHING_WENT_WRONG],
      options: error,
    });
  }
}
