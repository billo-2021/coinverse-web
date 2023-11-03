import {menuItems} from '../constants';
import {webRoutesConfig} from './web-routes-config';
import {apiRoutesConfig} from './api-routes.config';

const commonServiceConfig = {
  appTitle: 'coinverse-web',
  webRoutesConfig: webRoutesConfig,
  apiRoutesConfig: apiRoutesConfig,
  menuItems: menuItems
} as const;

export {commonServiceConfig}
