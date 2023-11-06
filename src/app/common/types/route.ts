export type RouteType =
  | { path: '' }
  | { path: 'dashboard' }
  | { path: 'authentication/login' }
  | { path: 'authentication/register' }
  | { path: 'authentication/verify' }
  | { path: 'administration/users' & string }
  | { path: `administration/currencies` & string };
