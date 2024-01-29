import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  HostBinding,
  Input,
  Output,
  ViewEncapsulation,
} from '@angular/core';
import { CurrencyExchangeRate, CurrencyQuote, QuoteService } from '../../../../domain';

export type TradeAction = 'buy' | 'sell';

export interface TradeQuoteComponentInput {
  currencyPairName: string | null;
  tradeAction: TradeAction;
  readonly exchangeRate: CurrencyExchangeRate | null;
  readonly quote: CurrencyQuote | null;
}

export interface TradeQuoteComponentOutput {
  acceptQuoteClicked: EventEmitter<number>;
  declineQuoteClicked: EventEmitter<void>;
}

@Component({
  selector: 'app-trade-quote',
  templateUrl: './trade-quote.component.html',
  styleUrls: ['./trade-quote.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TradeQuoteComponent implements TradeQuoteComponentInput, TradeQuoteComponentOutput {
  @Input() public currencyPairName: string | null = null;
  @Input() public tradeAction: TradeAction = 'buy';
  @Input() public exchangeRate: CurrencyExchangeRate | null = null;
  @Input() public quote: CurrencyQuote | null = null;

  @Output() public acceptQuoteClicked = new EventEmitter<number>();
  @Output() public declineQuoteClicked = new EventEmitter<void>();

  @HostBinding('class') private _classes = 'block';

  constructor(private readonly _quoteService: QuoteService) {}

  public onAcceptQuote(): void {
    const quote = this.quote;

    if (!quote) {
      return;
    }

    this.acceptQuoteClicked.emit(quote.id);
  }

  public onDeclineQuote(): void {
    this.declineQuoteClicked.emit();
  }
}
