import { ChangeDetectionStrategy, Component, HostBinding, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-balance-history',
  templateUrl: './balance-history.component.html',
  styleUrls: ['./balance-history.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BalanceHistoryComponent {
  @HostBinding('class') private _classes = 'block';
}
