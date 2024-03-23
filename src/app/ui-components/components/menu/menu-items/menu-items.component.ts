import { ChangeDetectionStrategy, Component, Input, ViewEncapsulation } from '@angular/core';
import { MenuItem } from '../../../../shared';

export interface MenuItemsInput {
  items: readonly MenuItem[];
}

@Component({
  selector: 'app-menu-items',
  templateUrl: './menu-items.component.html',
  styleUrls: ['./menu-items.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MenuItemsComponent implements MenuItemsInput {
  @Input() public items: readonly MenuItem[] = [];
}
