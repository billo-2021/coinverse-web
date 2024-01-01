import { Injectable } from '@angular/core';
import {
  BehaviorSubject,
  combineLatest,
  filter,
  map,
  Observable,
  shareReplay,
  startWith,
  switchMap,
  tap,
} from 'rxjs';

import { tuiIsPresent } from '@taiga-ui/cdk';

import { QuoteService } from '../../../common';

import { ActionType, TradeQuoteViewModel } from '../components/trade-quote/trade-quote.view-model';
import {
  CurrencyExchangeRateResponse,
  CurrencyExchangeResponseData,
} from '../../../common/domain-models/quote';

@Injectable({
  providedIn: 'root',
})
export class TradeQuoteViewModelService extends Observable<TradeQuoteViewModel> {
  private readonly _currencyPairName$ = new BehaviorSubject<string | null>(null);
  private readonly _action$ = new BehaviorSubject<ActionType | null>(null);

  private readonly _exchangeRate$ = new BehaviorSubject<CurrencyExchangeRateResponse | null>(null);
  private readonly _exchangeRateData$ = new BehaviorSubject<CurrencyExchangeResponseData | null>(
    null
  );

  private readonly _request$ = this._currencyPairName$.pipe(
    filter(tuiIsPresent),
    switchMap((currencyPairName) =>
      this._quoteService
        .getCurrencyExchangeRateByCurrencyPairName(currencyPairName)
        .pipe(startWith(null))
    ),
    tap((currencyExchangeRateResponse) => {
      if (!currencyExchangeRateResponse) {
        return;
      }
      this._exchangeRate$.next(currencyExchangeRateResponse);
      this._exchangeRateData$.next(currencyExchangeRateResponse.data[0]);
    }),
    shareReplay(1)
  );

  private readonly _stream: Observable<TradeQuoteViewModel> = combineLatest([
    this._currencyPairName$.asObservable(),
    this._action$.asObservable(),
    this._exchangeRate$,
    this._exchangeRateData$,
    this._request$,
  ]).pipe(
    map(([currencyPairName, action, exchangeRate, exchangeRateData]) => ({
      currencyPairName,
      action,
      exchangeRate,
      exchangeRateData,
    }))
  );

  constructor(private readonly _quoteService: QuoteService) {
    super((subscriber) => this._stream.subscribe(subscriber));
  }

  public set currencyPairName(value: string | null) {
    this._currencyPairName$.next(value);
  }

  public set action(value: ActionType | null) {
    this._action$.next(value);
  }

  public get exchangeRate(): CurrencyExchangeRateResponse | null {
    return this._exchangeRate$.value;
  }

  public get exchangeRateData(): CurrencyExchangeResponseData | null {
    return this._exchangeRateData$.value;
  }
}
