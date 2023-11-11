import { Component, Inject, OnDestroy } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { appTitleToken } from './common/config';
import { MenuService } from './common/domain-services/menu/menu.service';
import { AppViewModel } from './app.view-model';
import { GlobalRoutingService } from './global-routing/services/global-routing/global-routing.service';
import { BaseComponent } from './common/components';
import { UserPermissionsService } from "./common/services/user-permissions/user-permissions.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent extends BaseComponent implements OnDestroy {
  private readonly _viewModel$: Observable<AppViewModel>;

  public constructor(
    @Inject(GlobalRoutingService)
    private readonly globalRoutingService: GlobalRoutingService,
    @Inject(appTitleToken) protected readonly title: string,
    @Inject(UserPermissionsService) private readonly _userPermissionsService: UserPermissionsService,
    @Inject(MenuService) private readonly menuService: MenuService
  ) {
    super();
    globalRoutingService.start();

    this._viewModel$ = this._userPermissionsService.permissions$.pipe(tap((userPermissions) => {
      this.menuService.setIsSideMenuShown(userPermissions.isMenuShown);
      this.menuService.setIsMenuShown(userPermissions.isMenuShown);
    }));
  }

  protected get viewModel$() {
    return this._viewModel$;
  }

  public override ngOnDestroy(): void {
    super.ngOnDestroy();
    this.globalRoutingService.stop();
  }
}
