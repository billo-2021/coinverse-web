import { Component, EventEmitter, Input, Output, Self } from '@angular/core';

import { TradeQuoteViewModelService } from '../../services';

@Component({
  selector: 'app-trade-quote',
  templateUrl: './trade-quote.component.html',
  styleUrls: ['./trade-quote.component.scss'],
  providers: [TradeQuoteViewModelService],
})
export class TradeQuoteComponent {
  @Output() public acceptQuoteClicked = new EventEmitter<number>();
  @Output() public declineQuoteClicked = new EventEmitter<void>();

  protected viewModel$: TradeQuoteViewModelService;

  constructor(@Self() private readonly _viewModel$: TradeQuoteViewModelService) {
    this.viewModel$ = _viewModel$;
  }

  @Input()
  public set currencyPairName(value: string | null | undefined) {
    if (!value) {
      this.viewModel$.currencyPairName = null;
      return;
    }

    this.viewModel$.currencyPairName = value;
  }

  public onAcceptQuote(): void {
    const exchangeRateData = this.viewModel$.exchangeRateData;

    if (!exchangeRateData) {
      return;
    }

    this.acceptQuoteClicked.emit(exchangeRateData.id);
  }

  public onDeclineQuote(): void {
    this.declineQuoteClicked.emit();
  }
}
