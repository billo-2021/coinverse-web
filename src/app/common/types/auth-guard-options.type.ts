import { WebRoutesConfigType } from './web-routes-config.type';

export type AuthGuardOptions =
  | {
      isAuthenticated: true;
      route: WebRoutesConfigType;
    }
  | {
      isAuthenticated: false;
    };
