import { menuItemsConfig } from './menu-items.config';
import { webRoutesConfig } from './web-routes.config';
import { apiRoutesConfig } from './api-routes.config';

export const commonServiceConfig = {
  appName: 'Coinverse',
  appTitle: 'coinverse-web',
  webRoutesConfig: webRoutesConfig,
  apiRoutesConfig: apiRoutesConfig,
  menuItemsConfig: menuItemsConfig,
  apiPageRequest: { page: 0, size: 10 },
  apiMaxPageRequest: { page: 0, size: 100 },
} as const;
