import { Component, EventEmitter, Input, Output, Self, SkipSelf } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { TradeModel } from '../../models';
import { TradeTabs } from '../../pages';
import { TradeForm } from '../../models/trade-form.model';
import { TradeFormService, TradeFormViewModelService } from '../../services';

type Tab = {
  text: string;
  icon: string | null;
  isDisabled: boolean;
};

const ACTION: Record<number, string> = {
  0: 'Buy',
  1: 'Sell',
};

@Component({
  selector: 'app-trade-form',
  templateUrl: './trade-form.component.html',
  styleUrls: ['./trade-form.component.scss'],
  providers: [TradeFormViewModelService],
})
export class TradeFormComponent {
  @Input() public activeTabIndex: TradeTabs = TradeTabs.BUY;
  @Output() public actionClicked = new EventEmitter<TradeModel>();
  @Output() public activeTabIndexChange = new EventEmitter<TradeTabs>();
  protected readonly viewModel$: TradeFormViewModelService;
  protected readonly form: FormGroup<TradeForm>;
  protected readonly tabs: Tab[] = [
    { text: 'BUY', icon: null, isDisabled: false },
    { text: 'SELL', icon: null, isDisabled: false },
  ];
  protected readonly action = ACTION;

  public constructor(
    @Self() private readonly _viewModel$: TradeFormViewModelService,
    @SkipSelf() private readonly _tradeForm$: TradeFormService
  ) {
    this.form = _tradeForm$.value;
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

  public onActiveTabIndexChange(index: number): void {
    this.activeTabIndexChange.emit(index);
  }

  public onAction(): void {
    const tradeFromValue = this.form.getRawValue();

    if (!tradeFromValue.currencyPair || !tradeFromValue.amountCurrency) {
      return;
    }

    const trade: TradeModel = {
      currencyPairName: tradeFromValue.currencyPair.name,
      amountCurrency: tradeFromValue.amountCurrency.code,
      amount: tradeFromValue.amount,
    };

    this.actionClicked.emit(trade);
  }
}
