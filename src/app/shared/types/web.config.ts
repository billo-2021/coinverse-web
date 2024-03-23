import { MenuItem } from './menu-item';

export type WebConfig = {
  readonly appName: string;
  readonly appTitle: string;
  readonly menuItems: readonly MenuItem[];
};
