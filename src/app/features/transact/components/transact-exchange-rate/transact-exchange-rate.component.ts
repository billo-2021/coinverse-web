import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  HostBinding,
  Input,
  Output,
  ViewEncapsulation,
} from '@angular/core';

export type TransactionType = 'buy' | 'sell';

export interface TransactExchangeRateComponentInput {
  currencyPairName: string | null;
  transactionAction: TransactionType;
}

export interface TransactionExchangeRateComponentOutput {
  acceptRateClicked: EventEmitter<void>;
  declineRateClicked: EventEmitter<void>;
}

@Component({
  selector: 'app-transact-exchange-rate',
  templateUrl: './transact-exchange-rate.component.html',
  styleUrls: ['./transact-exchange-rate.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TransactExchangeRateComponent
  implements TransactExchangeRateComponentInput, TransactionExchangeRateComponentOutput
{
  @Input() public currencyPairName: string | null = null;
  @Input() public transactionAction: TransactionType = 'buy';

  @Output() public acceptRateClicked = new EventEmitter<void>();
  @Output() public declineRateClicked = new EventEmitter<void>();

  @HostBinding('class') private _classes = 'block';

  public onAcceptRate(): void {
    this.acceptRateClicked.emit();
  }

  public onDeclineRate(): void {
    this.declineRateClicked.emit();
  }
}
