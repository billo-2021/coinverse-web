import { AfterViewInit, Component, HostBinding } from '@angular/core';
import { DestroyState, NavigationController, UserPrincipalStore, WebRoute } from '../../../shared';

@Component({
  selector: 'app-global',
  templateUrl: './global-routing.component.html',
  styleUrls: ['./global-routing.component.scss'],
  providers: [DestroyState],
})
export class GlobalRoutingComponent implements AfterViewInit {
  @HostBinding('class') private _classes = 'col align-items-center h-full';

  public constructor(
    private readonly _userPrincipalStore: UserPrincipalStore,
    private readonly _navigationService: NavigationController
  ) {}

  public ngAfterViewInit(): void {
    const isLoggedIn = this._userPrincipalStore.isLoggedIn();

    if (isLoggedIn) {
      this._navigationService.to(WebRoute.DASHBOARD).then();
      return;
    }

    this._navigationService.to(WebRoute.LOGIN).then();
  }
}
