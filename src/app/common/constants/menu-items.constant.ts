import { MenuItem } from '../types';
import { webRoutesConfig } from '../config/web-routes-config';

const menuItems: MenuItem[] = [
  {
    text: 'Dashboard',
    link: webRoutesConfig.dashboard.root,
    icon: 'tuiIconPieChart',
  },
  { text: 'Wallets', link: webRoutesConfig.wallets, icon: 'tuiIconBriefcase' },
  {
    text: 'Transact',
    link: webRoutesConfig.transact.root,
    icon: 'tuiIconCreditCard',
  },
  { text: 'Trade', link: webRoutesConfig.trade.root, icon: 'tuiIconShuffle' },
  {
    text: 'Currencies',
    link: webRoutesConfig.administration.manageCurrencies,
    icon: 'tuiIconDollarSign',
  },
  {
    text: 'Users',
    link: webRoutesConfig.administration.manageUsers,
    icon: 'tuiIconUsers',
  },
  {
    text: 'Account',
    link: webRoutesConfig.profile.root,
    icon: 'tuiIconSettings',
  },
];

export { menuItems };
