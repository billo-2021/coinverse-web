import {AfterViewInit, Component, Inject} from '@angular/core';
import {webRoutesConfig} from "../../../common/config/web-routes-config";
import {GlobalRoutingService} from "../../services/global-routing/global-routing.service";


@Component({
  selector: 'app-global-routing',
  templateUrl: './global-routing.component.html',
  styleUrls: ['./global-routing.component.scss']
})
export class GlobalRoutingComponent implements AfterViewInit {
  public constructor(@Inject(GlobalRoutingService) private readonly globalRoutingService: GlobalRoutingService) {
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
