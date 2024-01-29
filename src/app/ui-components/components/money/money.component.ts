import {
  ChangeDetectionStrategy,
  Component,
  HostBinding,
  Input,
  ViewEncapsulation,
} from '@angular/core';

export type Decimal = 'always' | 'never' | 'not-zero';
export type MoneySign = 'always' | 'force-negative' | 'force-positive' | 'negative-only' | 'never';

export interface MoneyComponentInput {
  colored: boolean;
  currency: string;
  decimal: Decimal;
  precision: number;
  sign: MoneySign;
  singleColor: boolean;
  value: number;
}

@Component({
  selector: 'app-money',
  templateUrl: './money.component.html',
  styleUrls: ['./money.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MoneyComponent implements MoneyComponentInput {
  @Input() public colored = false;
  @Input() public currency = 'R';
  @Input() public decimal: Decimal = 'not-zero';
  @Input() public precision = 2;
  @Input() public sign: MoneySign = 'negative-only';
  @Input() public singleColor = false;
  @Input() public value = 0;

  @HostBinding('class') private _classes = 'block';
}
