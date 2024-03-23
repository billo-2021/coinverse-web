import { MenuItem } from '../types';
import { WebRoute } from '../enums';

export const MENU_ITEMS: MenuItem[] = [
  {
    text: 'Dashboard',
    link: WebRoute.DASHBOARD,
    icon: 'tuiIconPieChart',
    roles: ['admin', 'customer'],
  },
  {
    text: 'Wallets',
    link: WebRoute.WALLETS,
    icon: 'tuiIconBriefcase',
    roles: ['admin', 'customer'],
  },
  {
    text: 'Fund',
    link: WebRoute.TRANSACT,
    icon: 'tuiIconCreditCard',
    roles: ['admin', 'customer'],
  },
  {
    text: 'Trade',
    link: WebRoute.TRADE,
    icon: 'tuiIconShuffle',
    roles: ['admin', 'customer'],
  },
  {
    text: 'Currencies',
    link: WebRoute.MANAGE_CURRENCIES,
    icon: 'tuiIconDollarSign',
    roles: ['admin'],
  },
  {
    text: 'Users',
    link: WebRoute.MANAGE_USERS,
    icon: 'tuiIconUsers',
    roles: ['admin'],
  },
  {
    text: 'Account',
    link: WebRoute.PROFILE,
    icon: 'tuiIconSettings',
    roles: ['admin', 'customer'],
  },
];
