import { ChangeDetectionStrategy, Component, HostBinding, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-trade-result',
  templateUrl: './trade-result.component.html',
  styleUrls: ['./trade-result.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TradeResultComponent {
  @HostBinding('class') private _classes = 'block';
}
