import { ChangeDetectionStrategy, Component, HostBinding, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-transact-result',
  templateUrl: './transact-result.component.html',
  styleUrls: ['./transact-result.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TransactResultComponent {
  @HostBinding('class') private _classes = 'block';
}
