import {UserPrincipal} from '../../../../common/domain-models';

export type MenuComponentInput = {
  isMenuShown: boolean;
  animationDuration: number;
  user: UserPrincipal | null;
}
