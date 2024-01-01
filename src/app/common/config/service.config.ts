import { menuItems } from '../constants';
import { webRoutesConfig } from './web-routes-config';
import { apiRoutesConfig } from './api-routes.config';

const commonServiceConfig = {
  appName: 'Coinverse',
  appTitle: 'coinverse-web',
  webRoutesConfig: webRoutesConfig,
  apiRoutesConfig: apiRoutesConfig,
  menuItems: menuItems,
  apiPageRequest: { page: 1, size: 10 },
} as const;

export { commonServiceConfig };
