import { ErrorHandler, Injectable } from '@angular/core';
import { LoggingService } from '../logging/logging.service';
import { apiErrorCodes, apiErrorMessages } from '../../../common/constants';
import { ApiError } from '../../models';
import { isKnownError } from '../../../common/utils';

@Injectable({
  providedIn: 'root',
})
export class GlobalErrorHandlerService implements ErrorHandler {
  constructor(private _log$: LoggingService) {}

  handleError(error: unknown): void {
    if (!(error instanceof ApiError)) {
      console.error(error);
    }

    if (error instanceof ApiError) {
      console.warn('Caught by error handler ', error);
    }

    if (isKnownError(error)) {
      this._log$.next({ type: 'error', message: error.message, options: error });
      return;
    }

    this._log$.next({
      type: 'error',
      message: apiErrorMessages[apiErrorCodes.SOMETHING_WENT_WRONG],
      options: error,
    });
  }
}
