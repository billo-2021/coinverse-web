import { Provider } from '@angular/core';
import {
  apiPageRequestToken,
  appNameToken,
  appTitleToken,
  commonServiceConfig,
  menuItemsToken,
} from '../config';

export const PROVIDERS: Provider[] = [
  { provide: appNameToken, useValue: commonServiceConfig.appName },
  { provide: appTitleToken, useValue: commonServiceConfig.appTitle },
  { provide: menuItemsToken, useValue: commonServiceConfig.menuItems },
  { provide: apiPageRequestToken, useValue: commonServiceConfig.apiPageRequest },
];
