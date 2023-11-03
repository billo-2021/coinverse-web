import {ChangeDetectionStrategy, Component, Input, ViewEncapsulation} from '@angular/core';

type Decimal = 'always' | 'never' | 'not-zero';
type MoneySign = 'always' | 'force-negative' | 'force-positive' | 'negative-only' | 'never';

@Component({
  selector: 'app-money',
  templateUrl: './money.component.html',
  styleUrls: ['./money.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MoneyComponent {
  @Input() public colored = false;
  @Input() public currency: string = 'R';
  @Input() public decimal: Decimal = 'not-zero';
  @Input() public precision: number = 2;
  @Input() public sign: MoneySign = 'negative-only';
  @Input() public singleColor = false;
  @Input() public value: number = 0;

  public constructor() {
  }
}
