const authenticationRoute = '/authentication';
const lookupRoute = '/lookup';
const quotesRoute = '/quotes';
const transactRoute = '/transfers';
const administrationRoute = '/administration';
const adminUsersRoute = `${administrationRoute}/users` as const;
const accountRoute = '/account';
const profileRoute = '/profile';

const apiRoutesConfig = {
  authentication: authenticationRoute,
  register: `${administrationRoute}/register`,
  login: `${administrationRoute}/login`,
  verifyAccount: `${administrationRoute}/verify`,
  requestToken: `${administrationRoute}/request-token`,
  resetPassword: `${administrationRoute}/reset-password`,
  lookup: lookupRoute,
  allCountries: `${lookupRoute}/all/countries`,
  countries: `${lookupRoute}/countries`,
  allCurrencies: `${lookupRoute}/all/currencies`,
  currencies: `${lookupRoute}/currencies`,
  allCryptoCurrencies: `${lookupRoute}/all/crypto`,
  cryptoCurrencies: `${lookupRoute}/crypto`,
  allCurrencyPairs: `${lookupRoute}/all/currency-pairs`,
  currencyPairs: `${lookupRoute}/currency-pairs`,
  allPaymentMethods: `${lookupRoute}/all/payment-methods`,
  paymentMethods: `${lookupRoute}/payment-methods`,
  quotes: quotesRoute,
  quotesCurrencyPair: `${quotesRoute}/currency-pair`,
  balances: '/balances',
  trades: '/trades',
  transact: transactRoute,
  transactions: `${transactRoute}/transactions`,
  withdraw: `${transactRoute}/withdraw`,
  deposit: `${transactRoute}/deposit`,
  administration: administrationRoute,
  adminUsers: adminUsersRoute,
  adminUsersDisableAccount: `${adminUsersRoute}/disable-account`,
  adminUsersEnableAccount: `${adminUsersRoute}/enable-account`,
  adminCryptoCurrencies: `${administrationRoute}/crypto`,
  account: accountRoute,
  accountChangePassword: `${accountRoute}/change-password`,
  accountActivity: `${accountRoute}/activity`,
  profile: profileRoute,
  profilePersonalInformation: `${profileRoute}/personal-information`,
  profileAddress: `${profileRoute}/address`,
  profilePreference: `${profileRoute}/preference`,
} as const;

export { apiRoutesConfig };
