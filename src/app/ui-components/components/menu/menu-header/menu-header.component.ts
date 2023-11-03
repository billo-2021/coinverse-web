import {ChangeDetectionStrategy, Component, EventEmitter, Input, Output, ViewEncapsulation} from '@angular/core';
import {UserPrincipal} from "../../../../common/domain-models";
import {UserPrincipalStoreService} from "../../../../common/domain-services";
import {Router} from "@angular/router";
import {webRoutesConfig} from "../../../../common/config/web-routes-config";

@Component({
  selector: 'app-menu-header',
  templateUrl: './menu-header.component.html',
  styleUrls: ['./menu-header.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {'class': 'header'}
})
export class MenuHeaderComponent {
  @Input() public isMobile = false;
  @Input() public user: UserPrincipal | null = null;

  @Output() public toggleMenuClicked = new EventEmitter<boolean>();

  public constructor(private readonly router: Router,
                     private readonly userPrincipalService: UserPrincipalStoreService) {
  }

  public onMenuToggle(open: boolean): void {
    this.toggleMenuClicked.emit(open);
  }

  public async onSignOut(): Promise<void> {
    await this.router.navigate([webRoutesConfig.authentication.login]);
    this.userPrincipalService.logOut();
  }

  public async onGotoProfile(): Promise<void> {
    await this.router.navigate([webRoutesConfig.profile.root]);
  }
}
