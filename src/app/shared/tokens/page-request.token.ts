import { InjectionToken } from '@angular/core';
import { PageRequest } from '../types';

export const PAGE_REQUEST_TOKEN = new InjectionToken<PageRequest>('PAGE_REQUEST');
