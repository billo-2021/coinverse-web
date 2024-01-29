import { Provider } from '@angular/core';
import { JWT_OPTIONS } from '@auth0/angular-jwt';
import { TUI_SANITIZER } from '@taiga-ui/core';
import { NgDompurifySanitizer } from '@tinkoff/ng-dompurify';

import { apiBaseUrlToken, coreServiceConfig, httpHeadersConfigToken } from '../config';
import { INTERCEPTOR_PROVIDERS } from './interceptor.provider';
import { FORM_PROVIDERS } from './form.provider';
import { AUTHENTICATION_PROVIDERS } from './authentication.provider';

export const PROVIDERS: Provider[] = [
  ...INTERCEPTOR_PROVIDERS,
  ...FORM_PROVIDERS,
  ...AUTHENTICATION_PROVIDERS,
  { provide: JWT_OPTIONS, useValue: JWT_OPTIONS },
  { provide: TUI_SANITIZER, useClass: NgDompurifySanitizer },
  { provide: apiBaseUrlToken, useValue: coreServiceConfig.apiUrl },
  {
    provide: httpHeadersConfigToken,
    useValue: coreServiceConfig.httpHeadersConfig,
  },
];
