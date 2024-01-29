import {
  ChangeDetectionStrategy,
  Component,
  HostBinding,
  Inject,
  ViewEncapsulation,
} from '@angular/core';
import { combineLatest, map, merge, Observable, startWith, tap, throttleTime } from 'rxjs';
import { AlertService, LoggingService, UserPrincipal, UserPrincipalStoreService } from './core';
import {
  appTitleToken,
  isKnownErrorLog,
  MenuController,
  MenuItem,
  NavigationService,
  UserPermissionsService,
} from './common';
import { GlobalRoutingService } from './global-routing';

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
        if (isKnownErrorLog(log)) {
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
    this.menuController.isMobile$,
    this.menuController.isMenuShown$,
    this.menuController.isSideMenuShown$,
    this.menuController.menuItems$,
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
    @Inject(appTitleToken) protected readonly _appTitleToken: string,
    private readonly _userPrincipalStore$: UserPrincipalStoreService,
    private readonly _userPermissions$: UserPermissionsService,
    private readonly menuController: MenuController,
    private readonly _log$: LoggingService,
    private readonly _navigationService: NavigationService,
    private readonly _alertService: AlertService
  ) {}

  public onToggleMenu(open: boolean): void {
    this.menuController.setIsSideMenuShown(open);
  }

  public onSignOut(): void {
    this._userPrincipalStore$.logOut();
    this._navigationService.to('root').then();
  }

  public onGotoProfile(): void {
    this._navigationService.to('profile').then();
  }
}
