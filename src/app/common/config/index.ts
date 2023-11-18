import { apiRoutesConfig } from './api-routes.config';
import { commonServiceConfig } from './service.config';
import { InjectionToken } from '@angular/core';
import { MenuItem } from '../types';

const appNameToken = new InjectionToken<string>('appName');
const appTitleToken = new InjectionToken<string>('appTitle');
const menuItemsToken = new InjectionToken<MenuItem[]>('menuItems');

export { apiRoutesConfig, commonServiceConfig, appNameToken, appTitleToken, menuItemsToken };
