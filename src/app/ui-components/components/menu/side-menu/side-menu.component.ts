import {ChangeDetectionStrategy, Component, Inject, ViewEncapsulation} from '@angular/core';
import {combineLatest, map, Observable} from 'rxjs';
import {SideMenuViewModel} from './side-menu.view-model';
import {MenuService} from "../../../../common/domain-services/menu/menu.service";

@Component({
  selector: 'app-side-menu',
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SideMenuComponent {
  private readonly _viewModel$: Observable<SideMenuViewModel>;

  public constructor(@Inject(MenuService) private readonly menuService: MenuService) {

    this._viewModel$ = combineLatest([this.menuService.isMobile$, this.menuService.isSideMenuShown$])
      .pipe(map(([isMobile, isSideMenuShown]) => {
        return {
          isMobile: isMobile,
          isShown: isSideMenuShown,
          menuItems: this.menuService.menuItems
        };
      }));
  }

  public get viewModel$() {
    return this._viewModel$;
  }
}
