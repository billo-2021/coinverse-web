import { WebRoutesConfigType } from '../../core/types';

export type AuthGuardOptions =
  | {
      isAuthenticated: true;
      route: WebRoutesConfigType;
    }
  | {
      isAuthenticated: false;
    };
