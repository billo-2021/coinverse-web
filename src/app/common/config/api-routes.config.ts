const apiRoutesConfig = {
  authentication: {
    root: '/authentication',
    register: '/register',
    login: '/login',
    verifyAccount: '/verify',
    requestToken: '/request-token',
    resetPassword: '/reset-password',
  },
  lookup: {
    root: '/lookup',
    allCountries: '/all/countries',
    countries: '/countries',
    allCurrencies: '/all/currencies',
    currencies: '/currencies',
    allCryptoCurrencies: '/all/crypto',
    cryptoCurrencies: '/crypto',
    allCurrencyPairs: '/all/currency-pairs',
    currencyPairs: '/currency-pairs',
    allPaymentMethods: '/all/payment-methods',
    paymentMethods: '/payment-methods',
  },
  quotes: {
    root: '/quotes',
    currencyPairs: '/currency-pair',
  },
  balances: {
    root: '/balances',
  },
  trades: {
    root: '/trades',
  },
  transact: {
    root: '/transfers',
    transactions: '/transactions',
    withdraw: '/withdraw',
    deposit: '/deposit',
  },
  administration: {
    root: '/administration',
    users: {
      root: '/users',
      disableAccount: '/disable-account',
      enableAccount: '/enable-account',
    },
    cryptoCurrencies: '/crypto',
  },
  account: {
    root: '/account',
    changePassword: '/change-password',
    activity: '/activity',
  },
  profile: {
    root: '/profile',
    personalInformation: '/personal-information',
    address: '/address',
    preference: '/preference',
  },
} as const;

export { apiRoutesConfig };
