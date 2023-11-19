import { Component, Inject, OnDestroy } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { appTitleToken } from './common/config';
import { MenuService } from './common/services/menu/menu.service';
import { AppViewModel } from './app.view-model';
import { GlobalRoutingService } from './global-routing/services/global-routing/global-routing.service';
import { BaseComponent } from './common/components';
import { UserPermissionsService } from './common/services/user-permissions/user-permissions.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent extends BaseComponent implements OnDestroy {
  public constructor(
    private readonly _globalRoutingService: GlobalRoutingService,
    @Inject(appTitleToken) protected readonly _appTitleToken: string,
    private readonly _userPermissionsService: UserPermissionsService,
    private readonly _menuService: MenuService
  ) {
    super();
    _globalRoutingService.start();
  }

  protected get viewModel$(): Observable<AppViewModel> {
    return this._userPermissionsService.permissions$.pipe(
      tap((userPermissions) => {
        this._menuService.setIsSideMenuShown(userPermissions.isMenuShown);
        this._menuService.setIsMenuShown(userPermissions.isMenuShown);
      })
    );
  }

  public override ngOnDestroy(): void {
    super.ngOnDestroy();
    this._globalRoutingService.stop();
  }
}
