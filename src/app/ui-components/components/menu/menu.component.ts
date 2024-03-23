import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  HostBinding,
  Input,
  Output,
  ViewEncapsulation,
} from '@angular/core';
import { tuiWidthCollapse } from '@taiga-ui/core';
import { MenuItem, UserPrincipal } from '../../../shared';

export interface MenuComponentInput {
  user: UserPrincipal | null;
  animationDuration: number;
  isMobile: boolean;
  show: boolean;
  showSideMenu: boolean;
  sideMenuWidth: number;
  menuItems: readonly MenuItem[];
}

export interface MenuComponentOutput {
  toggleMenuClicked: EventEmitter<boolean>;
  signOutClicked: EventEmitter<void>;
  gotoProfileClicked: EventEmitter<void>;
}

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [tuiWidthCollapse],
})
export class MenuComponent implements MenuComponentInput, MenuComponentOutput {
  @Input() public user: UserPrincipal | null = null;
  @Input() public animationDuration = 250;
  @Input() public isMobile = false;
  @Input() public show = true;
  @Input() public showSideMenu = true;
  @Input() public menuItems: readonly MenuItem[] = [];

  @Output() public toggleMenuClicked = new EventEmitter<boolean>();
  @Output() public signOutClicked = new EventEmitter<void>();
  @Output() public gotoProfileClicked = new EventEmitter<void>();

  @HostBinding('class') private _classes = 'block h-full';

  private _sideMenuWidth = 12;

  public get sideMenuWidth(): number {
    return this.isMobile ? 0 : this._sideMenuWidth;
  }

  @Input()
  public set sideMenuWidth(value) {
    this._sideMenuWidth = value;
  }

  public onToggleMenu(open: boolean): void {
    this.toggleMenuClicked.emit(open);
  }

  public onClickOutside(open: boolean): void {
    if (!this.isMobile) {
      return;
    }

    this.onToggleMenu(open);
  }

  public onSignOut(): void {
    this.signOutClicked.emit();
  }

  public onGotoProfile(): void {
    this.gotoProfileClicked.emit();
  }
}
