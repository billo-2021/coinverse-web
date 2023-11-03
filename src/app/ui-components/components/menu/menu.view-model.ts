import {UserPrincipal} from "../../../common/domain-models";

export interface MenuViewModel {
  readonly isMobile: boolean;
  readonly sideMenuWidth: number;
  readonly isMenuShown: boolean;
  readonly isSideMenuShown: boolean;
  readonly animationDuration: number;
  readonly user: UserPrincipal | null;
}
