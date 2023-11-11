import { MenuItem } from '../types';
import { webRoutesConfig } from '../config/web-routes-config';

const menuItems: MenuItem[] = [
  {
    text: 'Dashboard',
    link: webRoutesConfig.dashboard.root,
    icon: 'tuiIconPieChart',
    roles: ['admin', 'customer']
  },
  {text: 'Wallets', link: webRoutesConfig.wallets, icon: 'tuiIconBriefcase', roles: ['admin', 'customer']},
  {
    text: 'Transact',
    link: webRoutesConfig.transact.root,
    icon: 'tuiIconCreditCard',
    roles: ['admin', 'customer']
  },
  {text: 'Trade', link: webRoutesConfig.trade.root, icon: 'tuiIconShuffle', roles: ['admin', 'customer']},
  {
    text: 'Currencies',
    link: webRoutesConfig.administration.manageCurrencies,
    icon: 'tuiIconDollarSign',
    roles: ['admin']
  },
  {
    text: 'Users',
    link: webRoutesConfig.administration.manageUsers,
    icon: 'tuiIconUsers',
    roles: ['admin']
  },
  {
    text: 'Account',
    link: webRoutesConfig.profile.root,
    icon: 'tuiIconSettings',
    roles: ['admin', 'customer']
  },
];

export { menuItems };
