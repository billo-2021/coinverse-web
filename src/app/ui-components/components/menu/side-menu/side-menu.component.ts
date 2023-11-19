import { ChangeDetectionStrategy, Component, Inject, ViewEncapsulation } from '@angular/core';
import { combineLatest, map, Observable } from 'rxjs';
import { SideMenuViewModel } from './side-menu.view-model';
import { MenuService } from '../../../../common/services';
import { appNameToken } from '../../../../common/config';

@Component({
  selector: 'app-side-menu',
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SideMenuComponent {
  public constructor(
    @Inject(MenuService) private readonly _menuService: MenuService,
    @Inject(appNameToken) private readonly _appNameToken: string
  ) {}

  public get viewModel$(): Observable<SideMenuViewModel> {
    return combineLatest([
      this._menuService.isMobile$,
      this._menuService.isSideMenuShown$,
      this._menuService.menuItems$,
    ]).pipe(
      map(([isMobile, isSideMenuShown, menuItems]) => {
        return {
          isMobile: isMobile,
          isShown: isSideMenuShown,
          menuItems: menuItems,
        };
      })
    );
  }

  protected get appName(): string {
    return this._appNameToken;
  }
}
