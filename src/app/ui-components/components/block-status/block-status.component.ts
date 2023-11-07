import { ChangeDetectionStrategy, Component, Input, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-block-status',
  templateUrl: './block-status.component.html',
  styleUrls: ['./block-status.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BlockStatusComponent {
  @Input() public card = false;
}
