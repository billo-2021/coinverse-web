import { Component, Self } from '@angular/core';
import { tap } from 'rxjs';

import { NavigationService, TradeService } from '../../../../common';
import { TradeRequest } from '../../../../common/domain-models/trade';

import { TradeModel } from '../../models';
import { TradeFormService } from '../../services/trade-form.service';
import { TradeViewModelService } from '../../services/trade-view-model.service';
import { TradeSteps, TradeTabs } from './trade.view-model';

@Component({
  selector: 'app-trade',
  templateUrl: './trade.component.html',
  styleUrls: ['./trade.component.scss'],
  providers: [TradeViewModelService, TradeFormService],
})
export class TradeComponent {
  protected readonly viewModel$: TradeViewModelService;
  protected readonly title = 'Trade';
  protected readonly subtitle = 'Make a trade here.';

  protected readonly MAX_NUMBER_OF_TABS = 2;
  protected readonly MAX_NUMBER_OF_STEPS = 3;
  protected readonly TRADE_STEPS = TradeSteps;
  protected formSteps = ['Trade Request', 'Quote', 'Confirmation'];

  public constructor(
    private readonly _navigationService: NavigationService,
    @Self() private readonly _viewModel$: TradeViewModelService,
    @Self() private readonly _tradeForm$: TradeFormService,
    private readonly _tradeService: TradeService
  ) {
    this.viewModel$ = _viewModel$;
  }

  public onStepChanged(nextStepIndex: number) {
    if (nextStepIndex >= this.MAX_NUMBER_OF_STEPS) {
      return;
    }

    this.viewModel$.currentStepIndex = nextStepIndex;
  }

  public onRequestTrade(trade: TradeModel): void {
    this.viewModel$.tradeModel = trade;
    this.viewModel$.currentStepIndex = TradeSteps.TRADE_QUOTE;
  }

  public onAcceptQuote(quoteId: number): void {
    const activeTabIndex = this.viewModel$.activeTabIndex;
    const tradeModel = this._viewModel$.tradeModel;

    if (!tradeModel) {
      return;
    }

    const tradeRequest: TradeRequest = {
      action: activeTabIndex === TradeTabs.BUY ? 'buy' : 'sell',
      amount: tradeModel.amount,
      amountCurrencyCode: tradeModel.amountCurrency,
      quoteId,
    };

    this._tradeService
      .requestTrade(tradeRequest)
      .pipe(
        tap((response) => {
          this.viewModel$.tradeResponse = response;
          this.viewModel$.currentStepIndex = TradeSteps.TRADE_CONFIRMATION;
        })
      )
      .subscribe();
  }

  public onDeclineQuote(): void {
    this.viewModel$.currentStepIndex = TradeSteps.TRADE_REQUEST;
  }

  public onViewTradesClicked(): void {
    this._navigationService.to('manageTrades').then();
  }

  public onTradeAgainClicked(): void {
    this.viewModel$.currentStepIndex = TradeSteps.TRADE_REQUEST;
  }

  public onTradeHistory(): void {
    this._navigationService.to('manageTrades').then();
  }

  public onActiveTabIndexChanged(index: number): void {
    if (index < 0 || index >= this.MAX_NUMBER_OF_TABS) {
      return;
    }

    this.viewModel$.activeTabIndex = index;
  }
}
