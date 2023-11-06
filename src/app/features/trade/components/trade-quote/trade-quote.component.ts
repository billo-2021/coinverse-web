import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { QuoteService } from '../../../../common/domain-services';
import { tap } from 'rxjs';
import {
  CurrencyExchangeRateResponse,
  CurrencyExchangeResponseData,
} from '../../../../common/domain-models/quote';

type ActionType = 'buy' | 'sell';

@Component({
  selector: 'app-trade-quote',
  templateUrl: './trade-quote.component.html',
  styleUrls: ['./trade-quote.component.scss'],
})
export class TradeQuoteComponent implements OnInit {
  @Input() public currencyPairName: string = '';
  @Input() public action: ActionType | null = null;
  @Output() public acceptQuoteClicked = new EventEmitter<number>();
  @Output() public declineQuoteClicked = new EventEmitter<void>();
  protected exchangeRate: CurrencyExchangeRateResponse | null = null;
  protected exchangeRateData: CurrencyExchangeResponseData | null = null;

  constructor(private readonly quoteService: QuoteService) {}

  ngOnInit(): void {
    this.quoteService
      .getCurrencyExchangeRateByCurrencyPairName(this.currencyPairName)
      .pipe(
        tap((response) => {
          this.exchangeRate = response;
          this.exchangeRateData = response.data[0];
        })
      )
      .subscribe();
  }

  public onAcceptQuote(): void {
    if (!this.exchangeRateData) {
      return;
    }

    this.acceptQuoteClicked.emit(this.exchangeRateData.id);
  }

  public onDeclineQuote(): void {
    this.declineQuoteClicked.emit();
  }
}
