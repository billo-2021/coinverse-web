import {UserPrincipal} from './common/domain-models';

export interface AppViewModel {
  readonly userPrincipal: UserPrincipal | null;
  readonly isAdmin: boolean;
  readonly isMenuShown: boolean;
}
