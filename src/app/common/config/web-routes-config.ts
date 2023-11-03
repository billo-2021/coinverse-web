export const webRoutesConfig = {
  root: '',
  dashboard: {
    root: 'dashboard'
  },
  authentication: {
    root: 'authentication',
    login: 'authentication/login',
    register: 'authentication/register',
    verifyAccount: 'authentication/verify',
    resetPassword: 'authentication/reset-password'
  },
  wallets: 'wallets',
  transact: {
    root: 'transact',
    manageTransactions: 'transact/manage-transactions',
  },
  trade: {
    root: 'trade',
    manageTrades: 'trade/manage-trades'
  },
  profile: {
    root: 'profile'
  },
  administration: {
    root: 'administration',
    manageUsers: 'administration/users',
    newUser: 'administration/users/new-user',
    manageCurrencies: 'administration/currencies',
    newCurrency: 'administration/currencies/new-currency'
  }
} as const;
