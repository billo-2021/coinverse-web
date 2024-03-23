import { WebRoute } from '../enums';

export type AuthGuardOptions =
  | {
      readonly isAuthenticated: true;
      readonly route: WebRoute;
    }
  | {
      readonly isAuthenticated: false;
    };
