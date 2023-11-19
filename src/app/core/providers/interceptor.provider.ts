import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { NetworkInterceptor } from '../interceptors/network/network.interceptor';
import { HttpErrorInterceptor } from '../interceptors/http-error/http-error.interceptor';

export const INTERCEPTOR_PROVIDERS = [
  { provide: HTTP_INTERCEPTORS, useClass: HttpErrorInterceptor, multi: true },
  { provide: HTTP_INTERCEPTORS, useClass: NetworkInterceptor, multi: true },
];
