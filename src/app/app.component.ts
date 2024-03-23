import { ChangeDetectionStrategy, Component, HostBinding, ViewEncapsulation } from '@angular/core';
import { combineLatest, map, merge, Observable, startWith, tap, throttleTime } from 'rxjs';
import {
  AlertService,
  ErrorUtils,
  LogState,
  MenuController,
  MenuItem,
  NavigationController,
  UserPermissionsStore,
  UserPrincipal,
  UserPrincipalStore,
  WebRoute,
} from './shared';
import { GlobalRoutingService } from './global';

export interface AppViewModel {
  readonly userPrincipal: UserPrincipal | null;
  readonly isAdmin: boolean;
  readonly isMobile: boolean;
  readonly isMenuShown: boolean;
  readonly isSideMenuShown: boolean;
  readonly menuItems: readonly MenuItem[];
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  protected readonly _effects$ = merge(
    this._globalRouting$.pipe(),
    this._log$.pipe(
      throttleTime(2000),
      tap((log) => {
        if (ErrorUtils.isKnownErrorLog(log)) {
          this._alertService.showErrorMessage(log.message);
          return;
        }

        if (log.type === 'info') {
          this._alertService.showMessage(log.message);
        }
      })
    )
  ).pipe(startWith(null));

  protected readonly viewModel$: Observable<AppViewModel> = combineLatest([
    this._userPermissions$,
    this._menuController.isMobile$,
    this._menuController.isMenuShown$,
    this._menuController.isSideMenuShown$,
    this._menuController.menuItems$,
    this._effects$,
  ]).pipe(
    map(([userPermissions, isMobile, isMenuShown, isSideMenuShown, menuItems]) => ({
      userPrincipal: userPermissions.userPrincipal,
      isAdmin: userPermissions.isAdmin,
      isMobile,
      isMenuShown,
      isSideMenuShown,
      menuItems,
    }))
  );
  @HostBinding('class') private _classes = 'block';

  public constructor(
    private readonly _globalRouting$: GlobalRoutingService,
    private readonly _userPrincipalStore$: UserPrincipalStore,
    private readonly _userPermissions$: UserPermissionsStore,
    private readonly _menuController: MenuController,
    private readonly _log$: LogState,
    private readonly _navigationService: NavigationController,
    private readonly _alertService: AlertService
  ) {}

  public onToggleMenu(open: boolean): void {
    this._menuController.setIsSideMenuShown(open);
  }

  public onSignOut(): void {
    this._userPrincipalStore$.logOut();
  }

  public onGotoProfile(): void {
    this._navigationService.to(WebRoute.PROFILE).then();
  }
}
