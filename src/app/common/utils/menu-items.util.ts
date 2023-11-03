import {menuItems} from '../constants/menu-items.constant';
import {MenuItem} from '../types';

function getMenuItems(isAdmin: boolean): MenuItem[] {
  if (isAdmin) {
    return menuItems;
  }

  return menuItems.filter(menuItem => {
    return !(menuItem.text === 'Currencies' || menuItem.text === 'Users');
  });
}

export {getMenuItems};
