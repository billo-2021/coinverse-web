import { UserPrincipal } from '../../../../common/domain-models';

export type MenuComponentInput = {
  readonly isMenuShown: boolean;
  readonly animationDuration: number;
  readonly user: UserPrincipal | null;
};
