import {
  ChangeDetectionStrategy,
  Component,
  HostBinding,
  Input,
  ViewEncapsulation,
} from '@angular/core';
import { Decimal, MoneySign } from './money.type';

@Component({
  selector: 'app-money',
  templateUrl: './money.component.html',
  styleUrls: ['./money.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MoneyComponent {
  @Input() public colored = false;
  @Input() public currency = 'R';
  @Input() public decimal: Decimal = 'not-zero';
  @Input() public precision = 2;
  @Input() public sign: MoneySign = 'negative-only';
  @Input() public singleColor = false;
  @Input() public value = 0;

  @HostBinding('class') private _classes = 'block';
}
