import {InjectionToken} from "@angular/core";

const httpHeadersConfig = {
  'Content-Type': 'application/json',
  Accept: 'application/json;charset=UTF-8',
} as const;

const baseUrlToken = new InjectionToken<string>('baseUrl');

export {httpHeadersConfig, baseUrlToken};
