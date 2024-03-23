import { of } from 'rxjs';
import { TUI_SANITIZER } from '@taiga-ui/core';
import { TUI_VALIDATION_ERRORS } from '@taiga-ui/kit';
import { TUI_INPUT_CARD_GROUPED_TEXTS } from '@taiga-ui/addon-commerce';
import { NgDompurifySanitizer } from '@tinkoff/ng-dompurify';
import { JWT_OPTIONS, JwtHelperService } from '@auth0/angular-jwt';
import { environment } from '../../../environments/environment';
import { ApiConfig, AuthConfig, SharedConfig, WebConfig } from '../types';
import {
  API_BASE_URL,
  APP_NAME,
  APP_TITLE,
  FOCUS_OPTIONS,
  HTTP_HEADERS,
  INPUT_CARD_GROUPED_TEXTS,
  MAX_PAGE_REQUEST,
  MENU_ITEMS,
  MESSAGING_CHANNEL,
  OTP_LENGTH,
  PAGE_REQUEST,
  VALIDATION_ERRORS,
  VERIFICATION_METHOD,
} from '../constants';
import {
  API_CONFIG_TOKEN,
  AUTH_CONFIG_TOKEN,
  FOCUS_OPTIONS_TOKEN,
  MAX_PAGE_REQUEST_TOKEN,
  PAGE_REQUEST_TOKEN,
  WEB_CONFIG_TOKEN,
} from '../tokens';

const API_CONFIG: ApiConfig = {
  baseUrl: environment.baseApiUrl ?? API_BASE_URL,
  httpHeaders: HTTP_HEADERS,
};

const WEB_CONFIG: WebConfig = {
  appName: APP_NAME,
  appTitle: APP_TITLE,
  menuItems: MENU_ITEMS,
};

const AUTH_CONFIG: AuthConfig = {
  otpLength: OTP_LENGTH,
  verificationMethod: VERIFICATION_METHOD,
  messagingChannel: MESSAGING_CHANNEL,
};

export const sharedConfig: SharedConfig = {
  providers: [
    { provide: API_CONFIG_TOKEN, useValue: API_CONFIG },
    { provide: WEB_CONFIG_TOKEN, useValue: WEB_CONFIG },
    {
      provide: AUTH_CONFIG_TOKEN,
      useValue: AUTH_CONFIG,
    },
    {
      provide: TUI_VALIDATION_ERRORS,
      useValue: VALIDATION_ERRORS,
    },
    {
      provide: TUI_INPUT_CARD_GROUPED_TEXTS,
      useValue: of(INPUT_CARD_GROUPED_TEXTS),
    },
    { provide: JWT_OPTIONS, useValue: JWT_OPTIONS },
    { provide: TUI_SANITIZER, useClass: NgDompurifySanitizer },
    { provide: PAGE_REQUEST_TOKEN, useValue: PAGE_REQUEST },
    { provide: MAX_PAGE_REQUEST_TOKEN, useValue: MAX_PAGE_REQUEST },
    { provide: FOCUS_OPTIONS_TOKEN, useValue: FOCUS_OPTIONS },
    JwtHelperService,
  ],
};
