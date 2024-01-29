import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { NetworkInterceptor } from '../interceptors';

export const INTERCEPTOR_PROVIDERS = [
  { provide: HTTP_INTERCEPTORS, useClass: NetworkInterceptor, multi: true },
];
