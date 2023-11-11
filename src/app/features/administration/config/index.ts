const titlePrefix = 'Admin -'
export const pagesConfig = {
  users: {path: 'users', title: `${titlePrefix} Users`},
  user: {path: 'users/new-user', title: `${titlePrefix} User`},
  userDetails: {path: 'users/:username', title: `${titlePrefix} User Details`},
  currencies: {path: 'currencies', title: `${titlePrefix} Currencies`},
  currency: {path: 'currencies/new-currency', title: `${titlePrefix} Currency`},
  currencyDetails: {path: 'currencies/:currencyCode', title: `${titlePrefix} Currency Details`}
} as const;
