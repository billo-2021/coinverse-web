import { Injectable } from '@angular/core';
import { BehaviorSubject, combineLatest, map, Observable, startWith, tap } from 'rxjs';

import { NavigationService } from '../../../common';
import { CurrencyTransactionResponse } from '../../../common/domain-models/trade';

import { TradeSteps, TradeTabs, TradeViewModel } from '../pages';
import { TradeModel } from '../models';

@Injectable({
  providedIn: 'root',
})
export class TradeViewModelService extends Observable<TradeViewModel> {
  private readonly _activeTabIndex$ = new BehaviorSubject<TradeTabs>(TradeTabs.BUY);
  private readonly _currentStepIndex$ = new BehaviorSubject<TradeSteps>(TradeSteps.TRADE_REQUEST);
  private readonly _currencyPairName$ = new BehaviorSubject<string | null>(null);
  private readonly _tradeModel$ = new BehaviorSubject<TradeModel | null>(null);
  private readonly _tradeResponse$ = new BehaviorSubject<CurrencyTransactionResponse | null>(null);

  private readonly _stream$: Observable<TradeViewModel> = combineLatest([
    this._activeTabIndex$,
    this._currentStepIndex$,
    this._currencyPairName$,
    this._tradeModel$,
    this._tradeResponse$,
  ]).pipe(
    map(([activeTabIndex, currentStepIndex, currencyPairName, tradeModel, tradeResponse]) => ({
      activeTabIndex,
      currentStepIndex,
      currencyPairName,
      tradeModel,
      tradeResponse,
    }))
  );

  constructor(private readonly _navigationService: NavigationService) {
    super((subscriber) => this._stream$.subscribe(subscriber));

    this._navigationService.queryParam('action').pipe(
      startWith(null),
      tap((paramValue) => {
        if (!paramValue) {
          return;
        }

        const tabIndex = 'sell'.includes(paramValue.toLowerCase()) ? 1 : 0;
        this._activeTabIndex$.next(tabIndex);
      })
    );

    this._navigationService
      .queryParam('currencyPairName')
      .pipe(tap((paramValue) => this._currencyPairName$.next(paramValue)));
  }

  public set activeTabIndex(value: TradeTabs) {
    this._activeTabIndex$.next(value);
  }

  public set currentStepIndex(value: TradeSteps) {
    this._currentStepIndex$.next(value);
  }

  public set tradeResponse(value: CurrencyTransactionResponse) {
    this._tradeResponse$.next(value);
  }

  public get currencyPairName(): string | null {
    return this._currencyPairName$.value;
  }

  public get tradeModel(): TradeModel | null {
    return this._tradeModel$.value;
  }

  public set tradeModel(value: TradeModel) {
    this._tradeModel$.next(value);
  }
}
