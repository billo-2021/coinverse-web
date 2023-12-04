import { Provider } from '@angular/core';
import { appNameToken, appTitleToken, commonServiceConfig, menuItemsToken } from '../config';

export const PROVIDERS: Provider[] = [
  { provide: appNameToken, useValue: commonServiceConfig.appName },
  { provide: appTitleToken, useValue: commonServiceConfig.appTitle },
  { provide: menuItemsToken, useValue: commonServiceConfig.menuItems },
];
