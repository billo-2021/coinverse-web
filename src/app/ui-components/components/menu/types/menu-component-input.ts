import { UserPrincipal } from '../../../../common';

export type MenuComponentInput = {
  readonly isMenuShown: boolean;
  readonly animationDuration: number;
  readonly user: UserPrincipal | null;
};
