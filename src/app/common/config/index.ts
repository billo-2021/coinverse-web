import { InjectionToken } from '@angular/core';
import { PageRequest } from '../../core';
import { MenuItem } from '../types';

export { apiRoutesConfig } from './api-routes.config';
export { commonServiceConfig } from './service.config';
export { webRoutesConfig } from './web-routes.config';
export { menuItemsConfig } from './menu-items.config';
export const appNameToken = new InjectionToken<string>('appName');
export const appTitleToken = new InjectionToken<string>('appTitle');
export const menuItemsToken = new InjectionToken<MenuItem[]>('menuItems');
export const apiPageRequestToken = new InjectionToken<PageRequest>('apiPageRequest');
export const apiMaxPageRequestToken = new InjectionToken<PageRequest>('apiMaxPageRequest');
