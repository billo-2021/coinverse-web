import { Component, Inject, Self } from '@angular/core';
import { Observable, takeUntil, tap, throttleTime } from 'rxjs';

import { AlertService, DestroyService, LoggingService } from './core';
import { appTitleToken, isKnownErrorLog, MenuService, UserPermissionsService } from './common';

import { GlobalRoutingService } from './global-routing';
import { AppViewModel } from './app.view-model';

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
          if (isKnownErrorLog(log)) {
            this._alertService.showErrorMessage(log.message);
            return;
          }

          if (log.type === 'info') {
            this._alertService.showMessage(log.message);
          }
        }),
        takeUntil(this._destroy$)
      )
      .subscribe();
  }
}
