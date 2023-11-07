import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  HostBinding,
  Input,
  Output,
  ViewEncapsulation,
} from '@angular/core';
import { UserPrincipal } from '../../../../common/domain-models';
import { UserPrincipalStoreService } from '../../../../common/domain-services';
import { Router } from '@angular/router';
import { webRoutesConfig } from '../../../../common/config/web-routes-config';

@Component({
  selector: 'app-menu-header',
  templateUrl: './menu-header.component.html',
  styleUrls: ['./menu-header.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MenuHeaderComponent {
  @HostBinding('class') classes = 'header';
  @Input() public isMobile = false;
  @Input() public user: UserPrincipal | null = null;

  @Output() public toggleMenuClicked = new EventEmitter<boolean>();

  public constructor(
    private readonly router: Router,
    private readonly userPrincipalService: UserPrincipalStoreService
  ) {
  }

  public onMenuToggle(open: boolean): void {
    this.toggleMenuClicked.emit(open);
  }

  public async onSignOut(): Promise<boolean> {
    this.userPrincipalService.logOut();
    return this.router.navigate(['/']);
  }

  public async onGotoProfile(): Promise<boolean> {
    return this.router.navigate([webRoutesConfig.profile.root]);
  }
}
