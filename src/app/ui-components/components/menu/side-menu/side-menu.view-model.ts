import {MenuItem} from '../../../../common/types';

export interface SideMenuViewModel {
  readonly isShown: boolean;
  readonly isMobile: boolean;
  readonly menuItems: MenuItem[];
}
