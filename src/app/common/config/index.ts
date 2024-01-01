import { InjectionToken } from '@angular/core';

import { PageRequest } from '../../core';

import { MenuItem } from '../types';
import { apiRoutesConfig } from './api-routes.config';
import { commonServiceConfig } from './service.config';
import { webRoutesConfig } from './web-routes-config';

const appNameToken = new InjectionToken<string>('appName');
const appTitleToken = new InjectionToken<string>('appTitle');
const menuItemsToken = new InjectionToken<MenuItem[]>('menuItems');
const apiPageRequestToken = new InjectionToken<PageRequest>('apiPageRequest');

export {
  apiRoutesConfig,
  commonServiceConfig,
  webRoutesConfig,
  appNameToken,
  appTitleToken,
  menuItemsToken,
  apiPageRequestToken,
};
