import { AfterViewInit, Component } from '@angular/core';

import { DestroyService } from '../../../core';
import { NavigationService, UserPrincipalStoreService } from '../../../common';

@Component({
  selector: 'app-global-routing',
  templateUrl: './global-routing.component.html',
  styleUrls: ['./global-routing.component.scss'],
  providers: [DestroyService],
})
export class GlobalRoutingComponent implements AfterViewInit {
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
