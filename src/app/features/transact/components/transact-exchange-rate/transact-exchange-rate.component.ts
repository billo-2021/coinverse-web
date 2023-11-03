import {Component, EventEmitter, Input, Output} from '@angular/core';

type TransactionType = 'buy' | 'sell';

@Component({
  selector: 'app-transact-exchange-rate',
  templateUrl: './transact-exchange-rate.component.html',
  styleUrls: ['./transact-exchange-rate.component.scss']
})
export class TransactExchangeRateComponent {
  @Input() public currencyPairName: string | null = null;
  @Input() public action: TransactionType | null = null;

  @Output() public acceptRateClicked = new EventEmitter<void>();
  @Output() public declineRateClicked = new EventEmitter<void>();

  constructor() {
  }

  ngOnInit(): void {
  }

  public onAcceptRate(): void {
    this.acceptRateClicked.emit();
  }

  public onDeclineRate(): void {
    this.declineRateClicked.emit();
  }
}
