import {
  ChangeDetectionStrategy,
  Component,
  HostBinding,
  Input,
  ViewEncapsulation,
} from '@angular/core';

export interface ExpandComponentInput {
  expanded: boolean;
}

@Component({
  selector: 'app-expand',
  templateUrl: './expand.component.html',
  styleUrls: ['./expand.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ExpandComponent implements ExpandComponentInput {
  @Input() expanded = false;

  @HostBinding('class') private _classes = 'block';
}
