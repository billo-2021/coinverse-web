import { AfterViewInit, Component, HostBinding } from '@angular/core';

import { DestroyService } from '../../../core';
import { NavigationService, UserPrincipalStoreService } from '../../../common';

@Component({
  selector: 'app-global-routing',
  templateUrl: './global-routing.component.html',
  styleUrls: ['./global-routing.component.scss'],
  providers: [DestroyService],
})
export class GlobalRoutingComponent implements AfterViewInit {
  @HostBinding('class') private _classes = 'col align-items-center h-full';

  public constructor(
    private readonly _userPrincipalStore: UserPrincipalStoreService,
    private readonly _navigationService: NavigationService
  ) {}

  ngAfterViewInit(): void {
    const isLoggedIn = this._userPrincipalStore.isLoggedIn();

    if (isLoggedIn) {
      this._navigationService.to('dashboard').then();
      return;
    }

    this._navigationService.to('login').then();
  }
}
