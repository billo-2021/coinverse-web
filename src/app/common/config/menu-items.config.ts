import { webRoutesConfig } from './web-routes.config';
import { MenuItem } from '../types';

export const menuItemsConfig: MenuItem[] = [
  {
    text: 'Dashboard',
    link: webRoutesConfig.dashboard,
    icon: 'tuiIconPieChart',
    roles: ['admin', 'customer'],
  },
  {
    text: 'Wallets',
    link: webRoutesConfig.wallets,
    icon: 'tuiIconBriefcase',
    roles: ['admin', 'customer'],
  },
  {
    text: 'Transact',
    link: webRoutesConfig.transact,
    icon: 'tuiIconCreditCard',
    roles: ['admin', 'customer'],
  },
  {
    text: 'Trade',
    link: webRoutesConfig.trade,
    icon: 'tuiIconShuffle',
    roles: ['admin', 'customer'],
  },
  {
    text: 'Currencies',
    link: webRoutesConfig.manageCurrencies,
    icon: 'tuiIconDollarSign',
    roles: ['admin'],
  },
  {
    text: 'Users',
    link: webRoutesConfig.manageUsers,
    icon: 'tuiIconUsers',
    roles: ['admin'],
  },
  {
    text: 'Account',
    link: webRoutesConfig.profile,
    icon: 'tuiIconSettings',
    roles: ['admin', 'customer'],
  },
];
