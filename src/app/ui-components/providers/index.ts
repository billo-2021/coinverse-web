import { Provider } from '@angular/core';

import { paginationToken } from '../config';

export const PROVIDERS: Provider[] = [{ provide: paginationToken, useValue: { page: 0, size: 5 } }];
