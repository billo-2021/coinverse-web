import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  HostBinding,
  Inject,
  Input,
  Output,
  ViewEncapsulation,
} from '@angular/core';

import {
  appNameToken,
  NavigationService,
  UserPrincipal,
  UserPrincipalStoreService,
} from '../../../../common';

@Component({
  selector: 'app-menu-header',
  templateUrl: './menu-header.component.html',
  styleUrls: ['./menu-header.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MenuHeaderComponent {
  @Input() public isMobile = false;
  @Input() public user: UserPrincipal | null = null;

  @Output() public toggleMenuClicked = new EventEmitter<boolean>();

  @HostBinding('class') private _classes = 'block header';

  public constructor(
    private readonly _navigationService: NavigationService,
    private readonly _userPrincipalService: UserPrincipalStoreService,
    @Inject(appNameToken) private readonly _appNameToken: string
  ) {}

  protected get appName(): string {
    return this._appNameToken;
  }

  public onMenuToggle(open: boolean): void {
    this.toggleMenuClicked.emit(open);
  }

  public async onSignOut(): Promise<boolean> {
    this._userPrincipalService.logOut();
    return this._navigationService.to('root');
  }

  public async onGotoProfile(): Promise<boolean> {
    return this._navigationService.to('profile');
  }
}
