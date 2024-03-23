import { ErrorHandler } from '@angular/core';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { GlobalConfig } from '../types';
import { GlobalErrorHandlerService } from '../services';
import { HttpErrorInterceptor, NetworkInterceptor } from '../interceptors';

export const globalConfig: GlobalConfig = {
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: NetworkInterceptor,
      multi: true,
    },
    { provide: HTTP_INTERCEPTORS, useClass: HttpErrorInterceptor, multi: true },
    { provide: ErrorHandler, useClass: GlobalErrorHandlerService },
  ],
};
