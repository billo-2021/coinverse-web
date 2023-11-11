import { Inject, Injectable } from '@angular/core';
import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { AlertService } from '../../services';
import { apiErrorCodes, apiErrorMessages } from "../../../common/constants";
import { isApiErrorDto } from "../../../common/validators";
import { UserPermissionsService } from "../../../common/services/user-permissions/user-permissions.service";
import { webRoutesConfig } from "../../../common/config/web-routes-config";
import { Router } from "@angular/router";

@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {
  constructor(@Inject(AlertService) private readonly alertService: AlertService,
              @Inject(UserPermissionsService) private readonly _userPermissionsService: UserPermissionsService,
              @Inject(Router) private router: Router) {
  }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        //let errorMessage = 'Something went wrong';

        if (!isApiErrorDto(error.error)) {
          console.log('Error', error);
          const errorMessage = apiErrorMessages[apiErrorCodes.SOMETHING_WENT_WRONG];

          this.alertService.showErrorMessage(errorMessage);
          return throwError(() => new Error(errorMessage));
        }

        const apiError = error.error;

        if (apiError.code === apiErrorCodes.ACCOUNT_VERIFICATION_REQUIRED) {
          this._userPermissionsService.verifyUser(false);
          this.router.navigate([webRoutesConfig.authentication.verifyAccount]).then();
        }

        this.alertService.showErrorMessage(error.error.message);

        return throwError(error.error);
      })
    );
  }
}
