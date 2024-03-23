import { InjectionToken } from '@angular/core';
import { PageRequest } from '../types';

export const MAX_PAGE_REQUEST_TOKEN = new InjectionToken<PageRequest>('MAX_PAGE_REQUEST');
