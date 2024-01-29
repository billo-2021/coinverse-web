import {
  ChangeDetectionStrategy,
  Component,
  HostBinding,
  Input,
  ViewEncapsulation,
} from '@angular/core';

export interface LoadingIndicatorComponentInput {
  overlay: boolean;
  show: boolean;
}

@Component({
  selector: 'app-loading-indicator',
  templateUrl: './loading-indicator.component.html',
  styleUrls: ['./loading-indicator.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoadingIndicatorComponent implements LoadingIndicatorComponentInput {
  @Input() public overlay = true;
  @Input() public show = true;

  @HostBinding('class') private _classes = 'block loading-indicator';
}
