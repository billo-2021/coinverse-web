import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  HostBinding,
  Input,
  Output,
  ViewEncapsulation,
} from '@angular/core';
import { CurrencyTransaction } from '../../../../domain';

export interface TradeConfirmationComponentInput {
  quoteId: number | null;
  tradeResponse: CurrencyTransaction | null;
}

export interface TradeConfirmationComponentOutput {
  viewTradesClicked: EventEmitter<void>;
  tradeAgainClicked: EventEmitter<void>;
}

@Component({
  selector: 'app-trade-confirmation',
  templateUrl: './trade-confirmation.component.html',
  styleUrls: ['./trade-confirmation.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TradeConfirmationComponent
  implements TradeConfirmationComponentInput, TradeConfirmationComponentOutput
{
  @Input() public quoteId: number | null = null;
  @Input() public tradeResponse: CurrencyTransaction | null = null;

  @Output() public viewTradesClicked = new EventEmitter<void>();

  @Output() public tradeAgainClicked = new EventEmitter<void>();

  @HostBinding('class') private _classes = 'block';

  public onViewTradesClicked(): void {
    this.viewTradesClicked.emit();
  }

  public onTradeClicked(): void {
    this.tradeAgainClicked.emit();
  }
}
