import {
  ChangeDetectionStrategy,
  Component,
  Inject,
  Input,
  ViewEncapsulation,
} from '@angular/core';
import { MenuItem, UserPrincipal, WEB_CONFIG_TOKEN, WebConfig } from '../../../../shared';

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
  @Input() public user: UserPrincipal | null = null;
  @Input() public isMobile = false;
  @Input() public show = true;
  @Input() public menuItems: readonly MenuItem[] = [];
  private readonly _appName: string = this._webConfig.appName;

  public constructor(@Inject(WEB_CONFIG_TOKEN) private readonly _webConfig: WebConfig) {}

  protected get appName(): string {
    return this._appName;
  }
}
