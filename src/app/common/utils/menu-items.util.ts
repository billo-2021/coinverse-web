import { MenuItem } from '../types';
import { menuItems } from '../constants';

function getMenuItems(isAdmin: boolean): MenuItem[] {
  if (isAdmin) {
    return menuItems;
  }

  return menuItems.filter((menuItem) => {
    return !(menuItem.text === 'Currencies' || menuItem.text === 'Users');
  });
}

export { getMenuItems };
