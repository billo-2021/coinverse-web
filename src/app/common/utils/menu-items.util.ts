import { MenuItem } from '../types';
import { menuItemsConfig } from '../config';

export function getMenuItems(isAdmin: boolean): MenuItem[] {
  if (isAdmin) {
    return menuItemsConfig;
  }

  return menuItemsConfig.filter((menuItem) => {
    return !(menuItem.text === 'Currencies' || menuItem.text === 'Users');
  });
}
