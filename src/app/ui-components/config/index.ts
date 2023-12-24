import { InjectionToken } from '@angular/core';

import { Pagination } from '../types';

const paginationToken = new InjectionToken<Pagination>('pagination');

export { paginationToken };
