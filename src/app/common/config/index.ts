import { InjectionToken } from '@angular/core';

import { MenuItem } from '../types';
import { apiRoutesConfig } from './api-routes.config';
import { commonServiceConfig } from './service.config';
import { webRoutesConfig } from './web-routes-config';

const appNameToken = new InjectionToken<string>('appName');
const appTitleToken = new InjectionToken<string>('appTitle');
const menuItemsToken = new InjectionToken<MenuItem[]>('menuItems');

export {
  apiRoutesConfig,
  commonServiceConfig,
  webRoutesConfig,
  appNameToken,
  appTitleToken,
  menuItemsToken,
};
