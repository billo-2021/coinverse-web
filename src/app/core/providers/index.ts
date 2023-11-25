import { ErrorHandler, Provider } from '@angular/core';
import { JWT_OPTIONS } from '@auth0/angular-jwt';
import { TUI_SANITIZER } from '@taiga-ui/core';
import { NgDompurifySanitizer } from '@tinkoff/ng-dompurify';
import { apiBaseUrlToken, coreServiceConfig, httpHeadersConfigToken } from '../config';
import {
  appNameToken,
  appTitleToken,
  commonServiceConfig,
  menuItemsToken,
} from '../../common/config';
import { INTERCEPTOR_PROVIDERS } from './interceptor.provider';
import { FORM_PROVIDERS } from './form.provider';
import { GlobalErrorHandlerService } from '../services/global-error-handler/global-error-handler.service';

export const PROVIDERS: Provider[] = [
  ...INTERCEPTOR_PROVIDERS,
  ...FORM_PROVIDERS,
  { provide: JWT_OPTIONS, useValue: JWT_OPTIONS },
  { provide: TUI_SANITIZER, useClass: NgDompurifySanitizer },
  { provide: apiBaseUrlToken, useValue: coreServiceConfig.apiUrl },
  { provide: ErrorHandler, useClass: GlobalErrorHandlerService },
  {
    provide: httpHeadersConfigToken,
    useValue: coreServiceConfig.httpHeadersConfig,
  },
  { provide: appNameToken, useValue: commonServiceConfig.appName },
  { provide: appTitleToken, useValue: commonServiceConfig.appTitle },
  { provide: menuItemsToken, useValue: commonServiceConfig.menuItems },
];
