import { MenuItem } from '../types';
import { MENU_ITEMS } from '../constants';

function getMenuItems(isAdmin: boolean): MenuItem[] {
  if (isAdmin) {
    return MENU_ITEMS;
  }

  return MENU_ITEMS.filter((menuItem) => {
    return !(menuItem.text === 'Currencies' || menuItem.text === 'Users');
  });
}

export const MenuItemUtils = {
  getMenuItems,
} as const;
