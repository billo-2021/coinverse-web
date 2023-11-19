import { Injectable } from '@angular/core';
import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { AlertService, NavigationService } from '../../services';
import { apiErrorCodes, apiErrorMessages } from '../../../common/constants';
import { isApiErrorDto } from '../../../common/validators';
import { UserPermissionsService } from '../../../common/services';

@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {
  constructor(
    private readonly _alertService: AlertService,
    private readonly _navigationService: NavigationService,
    private readonly _userPermissionsService: UserPermissionsService
  ) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        if (!isApiErrorDto(error.error)) {
          console.error('Api Error', error);
          const errorMessage = apiErrorMessages[apiErrorCodes.SOMETHING_WENT_WRONG];

          this._alertService.showErrorMessage(errorMessage);
          return throwError(() => new Error(errorMessage));
        }

        const apiError = error.error;

        if (apiError.code === apiErrorCodes.ACCOUNT_VERIFICATION_REQUIRED) {
          this._userPermissionsService.verifyUser(false);
          this._navigationService.to('verifyAccount').then();
        }

        this._alertService.showErrorMessage(error.error.message);

        return throwError(error.error);
      })
    );
  }
}
