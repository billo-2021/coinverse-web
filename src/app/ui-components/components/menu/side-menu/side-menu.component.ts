import {
  ChangeDetectionStrategy,
  Component,
  HostBinding,
  Inject,
  Input,
  ViewEncapsulation,
} from '@angular/core';
import { appNameToken, MenuItem } from '../../../../common';

export interface SideMenuComponentInput {
  isMobile: boolean;
  show: boolean;
  menuItems: readonly MenuItem[];
}

@Component({
  selector: 'app-side-menu',
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SideMenuComponent implements SideMenuComponentInput {
  @Input() public isMobile = false;
  @Input() public show = true;
  @Input() public menuItems: readonly MenuItem[] = [];

  @HostBinding('class') private _classes = 'block';

  public constructor(@Inject(appNameToken) private readonly _appNameToken: string) {}

  protected get appName(): string {
    return this._appNameToken;
  }
}
