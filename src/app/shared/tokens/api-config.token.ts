import { InjectionToken } from '@angular/core';
import { ApiConfig } from '../types';

export const API_CONFIG_TOKEN = new InjectionToken<ApiConfig>('apiConfig');
