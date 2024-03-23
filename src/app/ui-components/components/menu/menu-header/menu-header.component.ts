import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Inject,
  Input,
  Output,
  ViewEncapsulation,
} from '@angular/core';
import { UserPrincipal, WEB_CONFIG_TOKEN, WebConfig } from '../../../../shared';

export interface MenuHeaderComponentInput {
  isMobile: boolean;
  user: UserPrincipal | null;
}

export interface MenuHeaderComponentOutput {
  toggleMenuClicked: EventEmitter<boolean>;
  signOutClicked: EventEmitter<void>;
  gotoProfileClicked: EventEmitter<void>;
}

@Component({
  selector: 'app-menu-header',
  templateUrl: './menu-header.component.html',
  styleUrls: ['./menu-header.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MenuHeaderComponent implements MenuHeaderComponentInput, MenuHeaderComponentOutput {
  @Input() public isMobile = false;
  @Input() public user: UserPrincipal | null = null;
  @Output() public toggleMenuClicked = new EventEmitter<boolean>();
  @Output() public signOutClicked = new EventEmitter<void>();
  @Output() public gotoProfileClicked = new EventEmitter<void>();
  private readonly _appName: string = this._webConfig.appName;

  public constructor(@Inject(WEB_CONFIG_TOKEN) private readonly _webConfig: WebConfig) {}

  protected get appName(): string {
    return this._appName;
  }

  public onMenuToggle(open: boolean): void {
    this.toggleMenuClicked.emit(open);
  }

  public onSignOut(): void {
    this.signOutClicked.emit();
  }

  public onGotoProfile(): void {
    this.gotoProfileClicked.emit();
  }
}
