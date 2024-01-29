import {
  ChangeDetectionStrategy,
  Component,
  HostBinding,
  Input,
  ViewEncapsulation,
} from '@angular/core';

export interface BlockStatusComponentInput {
  card: boolean;
}

@Component({
  selector: 'app-block-status',
  templateUrl: './block-status.component.html',
  styleUrls: ['./block-status.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BlockStatusComponent implements BlockStatusComponentInput {
  @Input() public card = false;

  @HostBinding('class') private _classes = 'block';
}
