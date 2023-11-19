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
import { NavigationService } from '../../../../core/services';

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

  public constructor(
    private readonly _navigationService: NavigationService,
    private readonly _userPrincipalService: UserPrincipalStoreService
  ) {}

  @Input()
  public set classNames(value: string) {
    this._classes = value;
  }

  private _classes = '';

  @HostBinding('class')
  protected get classes(): string {
    return `header ${this._classes}`;
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
