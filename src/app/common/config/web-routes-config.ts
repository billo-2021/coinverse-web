const authenticationRoute = 'authentication';
const transactRoute = 'transact';
const tradeRoute = 'trade';
const administrationRoute = 'administration';
const adminUsersRoute = `${administrationRoute}/users` as const;
const adminCurrenciesRoute = `${administrationRoute}/currencies` as const;

export const webRoutesConfig = {
  root: '',
  dashboard: 'dashboard',
  authentication: authenticationRoute,
  login: `${authenticationRoute}/login`,
  register: `${authenticationRoute}/register`,
  verifyAccount: `${authenticationRoute}/verify`,
  resetPassword: `${authenticationRoute}/reset-password`,
  wallets: 'wallets',
  transact: transactRoute,
  manageTransactions: `${transactRoute}/manage-transactions`,
  trade: tradeRoute,
  manageTrades: `${tradeRoute}/manage-trades`,
  profile: 'profile',
  administration: administrationRoute,
  manageUsers: adminUsersRoute,
  newUser: `${adminUsersRoute}/new-user`,
  manageCurrencies: `${adminCurrenciesRoute}`,
  newCurrency: `${adminCurrenciesRoute}/new-currency`,
} as const;
