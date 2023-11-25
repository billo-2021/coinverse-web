import { Component, Inject, Self } from '@angular/core';
import { Observable, takeUntil, tap, throttleTime } from 'rxjs';
import { appTitleToken } from './common/config';
import { MenuService, UserPermissionsService } from './common/services';
import { AppViewModel } from './app.view-model';
import { GlobalRoutingService } from './global-routing/services/global-routing/global-routing.service';
import { LoggingService } from './core/services/logging/logging.service';
import { AlertService } from './core/services';
import { DestroyService } from './core/services/destroy/destroy.service';
import { ApiError } from './core/models';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [DestroyService],
})
export class AppComponent {
  protected viewModel$: Observable<AppViewModel>;

  public constructor(
    private readonly _globalRouting$: GlobalRoutingService,
    @Inject(appTitleToken) protected readonly _appTitleToken: string,
    private readonly _userPermissions$: UserPermissionsService,
    private readonly _menuService: MenuService,
    private readonly _log$: LoggingService,
    private readonly _alertService: AlertService,
    @Self() private readonly _destroy$: DestroyService
  ) {
    this._globalRouting$.pipe(takeUntil(this._destroy$)).subscribe();

    this.viewModel$ = this._userPermissions$.pipe(
      tap((userPermissions) => {
        this._menuService.setIsSideMenuShown(userPermissions.isMenuShown);
        this._menuService.setIsMenuShown(userPermissions.isMenuShown);
      })
    );

    this._log$
      .pipe(
        throttleTime(2000),
        tap((log) => {
          if (log.type === 'error' && log.options instanceof ApiError) {
            this._alertService.showErrorMessage(log.message);
            return;
          }

          this._alertService.showMessage(log.message);
        }),
        takeUntil(this._destroy$)
      )
      .subscribe();
  }
}
