import { InjectionToken } from '@angular/core';

const httpHeadersConfig = {
  'Content-Type': 'application/json',
  Accept: 'application/json;charset=UTF-8',
} as const;

const apiBaseUrlToken = new InjectionToken<string>('apiBaseUrl');
const httpHeadersConfigToken = new InjectionToken<Record<string, string | number>>(
  'httpHeadersConfig'
);

export { httpHeadersConfig, apiBaseUrlToken, httpHeadersConfigToken };
