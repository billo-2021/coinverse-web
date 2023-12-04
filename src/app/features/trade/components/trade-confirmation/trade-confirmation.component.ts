import { Component, EventEmitter, Input, Output } from '@angular/core';

import { CurrencyTransactionResponse } from '../../../../common/domain-models/trade';

@Component({
  selector: 'app-trade-confirmation',
  templateUrl: './trade-confirmation.component.html',
  styleUrls: ['./trade-confirmation.component.scss'],
})
export class TradeConfirmationComponent {
  @Input() public quoteId: number | null = null;
  @Input() public tradeResponse: CurrencyTransactionResponse | null = null;

  @Output() public viewTradesClicked = new EventEmitter<void>();
  @Output() public tradeAgainClicked = new EventEmitter<void>();

  public onViewTradesClicked(): void {
    this.viewTradesClicked.emit();
  }

  public onTradeClicked(): void {
    this.tradeAgainClicked.emit();
  }
}
