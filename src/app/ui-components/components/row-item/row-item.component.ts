import { ChangeDetectionStrategy, Component, Input, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-row-item',
  templateUrl: './row-item.component.html',
  styleUrls: ['./row-item.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'flex-col item-center' },
})
export class RowItemComponent {
  @Input() public title = '';
  @Input() public description = '';

  public constructor() {}
}
