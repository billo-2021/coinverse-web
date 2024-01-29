import { ErrorHandler, Provider } from '@angular/core';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import {
  apiMaxPageRequestToken,
  apiPageRequestToken,
  appNameToken,
  appTitleToken,
  commonServiceConfig,
  menuItemsToken,
} from '../config';
import { HttpErrorInterceptor } from '../interceptors';
import { GlobalErrorHandlerService } from '../services';

export const PROVIDERS: Provider[] = [
  { provide: HTTP_INTERCEPTORS, useClass: HttpErrorInterceptor, multi: true },
  { provide: ErrorHandler, useClass: GlobalErrorHandlerService },
  { provide: appNameToken, useValue: commonServiceConfig.appName },
  { provide: appTitleToken, useValue: commonServiceConfig.appTitle },
  { provide: menuItemsToken, useValue: commonServiceConfig.menuItemsConfig },
  { provide: apiPageRequestToken, useValue: commonServiceConfig.apiPageRequest },
  { provide: apiMaxPageRequestToken, useValue: commonServiceConfig.apiMaxPageRequest },
];
