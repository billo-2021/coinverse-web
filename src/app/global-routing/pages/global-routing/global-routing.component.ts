import { AfterViewInit, Component } from '@angular/core';
import { UserPrincipalStoreService } from '../../../common/domain-services';
import { NavigationService } from '../../../core/services';
import { webRoutesConfig } from '../../../common/config/web-routes-config';
import { Router } from '@angular/router';

@Component({
  selector: 'app-global-routing',
  templateUrl: './global-routing.component.html',
  styleUrls: ['./global-routing.component.scss'],
})
export class GlobalRoutingComponent implements AfterViewInit {
  public constructor(
    private router: Router,
    private readonly userPrincipalStore: UserPrincipalStoreService,
    private readonly navigationService: NavigationService
  ) {
  }

  ngAfterViewInit(): void {
    const isLoggedIn = this.userPrincipalStore.isLoggedIn();

    if (isLoggedIn) {
      this.navigationService.to({path: webRoutesConfig.dashboard.root}).then();
      return;
    }

    const userPrincipal = this.userPrincipalStore.userPrincipal;
    
    if (userPrincipal && !userPrincipal.isVerified) {
      this.navigationService.to({path: webRoutesConfig.authentication.verifyAccount}).then();
      return;
    }

    this.navigationService.to({path: webRoutesConfig.authentication.login}).then();
  }
}
