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
  ApiError,
  apiErrorCodes,
  apiErrorMessages,
  ApiValidators,
  NavigationController,
  UserPermissionsStore,
  WebRoute,
} from '../../../shared';

@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {
  public constructor(
    private readonly _navigationController: NavigationController,
    private readonly _userPermissionsStore: UserPermissionsStore
  ) {}

  public intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        if (!ApiValidators.isApiErrorDto(error.error)) {
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
          this._userPermissionsStore.verifyUser(false);
          this._navigationController.to(WebRoute.VERIFY_ACCOUNT).then();
        }

        return throwError(() => new ApiError(apiError.message, apiError.code, apiError.timeStamp));
      })
    );
  }
}
