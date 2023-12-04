import { Injectable } from '@angular/core';
import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';

import {
  apiErrorCodes,
  apiErrorMessages,
  isApiErrorDto,
  NavigationService,
  UserPermissionsService,
} from '../../../common';

import { ApiError } from '../../models';

@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {
  constructor(
    private readonly _navigationService: NavigationService,
    private readonly _userPermissionsService: UserPermissionsService
  ) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        if (!isApiErrorDto(error.error)) {
          const errorMessage = apiErrorMessages[apiErrorCodes.SOMETHING_WENT_WRONG];

          return throwError(
            () =>
              new ApiError(
                errorMessage,
                apiErrorCodes.SOMETHING_WENT_WRONG,
                new Date().toISOString()
              )
          );
        }

        const apiError = error.error;

        if (apiError.code === apiErrorCodes.ACCOUNT_VERIFICATION_REQUIRED) {
          this._userPermissionsService.verifyUser(false);
          this._navigationService.to('verifyAccount').then();
        }

        return throwError(() => new ApiError(apiError.message, apiError.code, apiError.timeStamp));
      })
    );
  }
}
