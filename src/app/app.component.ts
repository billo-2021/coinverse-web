import { Component, Inject } from '@angular/core';
import { NavigationService } from './core/services';
import { UserPrincipalStoreService } from './common/domain-services';
import { combineLatest, map, Observable, tap } from 'rxjs';
import { appTitleToken } from './common/config';
import { MenuService } from './common/domain-services/menu/menu.service';
import { AppViewModel } from './app.view-model';
import { GlobalRoutingService } from './global-routing/services/global-routing/global-routing.service';
import { BaseComponent } from './common/components';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent extends BaseComponent {
  private readonly _viewModel$: Observable<AppViewModel>;

  public constructor(
    @Inject(GlobalRoutingService)
    private readonly globalRoutingService: GlobalRoutingService,
    @Inject(NavigationService)
    private readonly navigationService: NavigationService,
    @Inject(UserPrincipalStoreService)
    private readonly userPrincipalStore: UserPrincipalStoreService,
    @Inject(appTitleToken) protected readonly title: string,
    @Inject(MenuService) private readonly menuService: MenuService
  ) {
    super();
    globalRoutingService.start();

    this._viewModel$ = combineLatest([
      this.userPrincipalStore.userLoggedIn$,
      this.userPrincipalStore.userPrincipal$,
    ]).pipe(
      map(([isUserLoggedIn, userPrincipal]) => {
        return {
          userPrincipal: userPrincipal,
          isAdmin: !!userPrincipal && userPrincipal.roles.includes('admin'),
          isMenuShown: isUserLoggedIn && !!userPrincipal && userPrincipal.isVerified,
        };
      }),
      tap(({ isAdmin, isMenuShown }) => {
        this.menuService.menuFilter = (isAdmin && { type: 'none' }) || {
          type: 'some',
          values: ['Currencies', 'Users'],
        };

        this.menuService.setIsSideMenuShown(isMenuShown);
        this.menuService.setIsMenuShown(isMenuShown);
      })
    );
  }

  protected get viewModel$() {
    return this._viewModel$;
  }

  public override ngOnDestroy(): void {
    super.ngOnDestroy();
    this.globalRoutingService.stop();
  }
}
