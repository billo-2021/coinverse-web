import { Injectable, SkipSelf } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { BehaviorSubject, combineLatest, map, Observable, shareReplay, startWith, tap } from 'rxjs';

import { ListOption } from '../../../form-components';
import { ListOptionsService } from '../../../common';
import { CurrencyPairResponse, CurrencyResponse } from '../../../common/domain-models/lookup';

import { TradeFormViewModel } from '../components/trade-form/trade-form.view-model';
import { TradeForm } from '../models/trade-form.model';
import { TradeFormService } from './trade-form.service';

@Injectable({
  providedIn: 'root',
})
export class TradeFormViewModelService extends Observable<TradeFormViewModel> {
  private readonly _currencyPairName$ = new BehaviorSubject<string | null>(null);
  private readonly _form: FormGroup<TradeForm>;
  private readonly _currencyPairOptions$: Observable<readonly ListOption<CurrencyPairResponse>[]>;
  private readonly _currencyOptions$: Observable<readonly ListOption<CurrencyResponse>[]>;
  private readonly _filteredCurrencyOptions$: Observable<readonly ListOption<CurrencyResponse>[]>;
  private readonly _currencyPairChanges$: Observable<ListOption<CurrencyPairResponse> | null>;
  private readonly _currencyPairNameChanges$: Observable<
    [
      string | null,
      readonly ListOption<CurrencyPairResponse>[],
      readonly ListOption<CurrencyResponse>[],
    ]
  >;

  private readonly _stream: Observable<TradeFormViewModel>;

  constructor(
    @SkipSelf() private readonly tradeForm: TradeFormService,
    private readonly _listOptionsService: ListOptionsService
  ) {
    super((subscriber) => this._stream.subscribe(subscriber));

    this._form = tradeForm.value;

    this._currencyPairOptions$ = _listOptionsService
      .getCurrencyPairOptions()
      .pipe(startWith([]), shareReplay(1));

    this._currencyOptions$ = _listOptionsService
      .getCurrencyOptions()
      .pipe(startWith([]), shareReplay(1));

    this._currencyPairChanges$ = this._form.controls.currencyPair.valueChanges.pipe(
      startWith<ListOption<CurrencyPairResponse> | null>(null)
    );

    this._filteredCurrencyOptions$ = combineLatest([
      this._currencyOptions$,
      this._currencyPairChanges$,
    ]).pipe(
      map(([currencyOptions, currencyPairOption]) => {
        if (!currencyPairOption) {
          return currencyOptions;
        }

        const currencyPair = currencyPairOption.value;

        const baseCurrency = currencyPair.baseCurrency;
        const quoteCurrency = currencyPair.quoteCurrency;

        return currencyOptions.filter(
          (option) => option.code === baseCurrency.code || option.code == quoteCurrency.code
        );
      }),
      tap((filteredCurrencyOptions) => {
        this._form.controls.amountCurrency.setValue(null);

        if (!filteredCurrencyOptions.length) {
          return;
        }

        this._form.controls.amountCurrency.setValue(filteredCurrencyOptions[0]);
      })
    );

    this._currencyPairNameChanges$ = combineLatest([
      this._currencyPairName$,
      this._currencyPairOptions$,
      this._currencyOptions$,
    ]).pipe(
      tap(([currencyPairName, currencyPairOptions]) => {
        this._form.controls.currencyPair.setValue(null);

        if (!currencyPairName) {
          return;
        }

        const foundCurrencyPair = currencyPairOptions.find((currencyPairOption) =>
          currencyPairOption.name.toLowerCase().includes(currencyPairName.toLowerCase())
        );

        if (!foundCurrencyPair) {
          return;
        }

        this._form.controls.currencyPair.setValue(foundCurrencyPair);
      })
    );

    this._stream = combineLatest([
      this._currencyPairOptions$,
      this._currencyOptions$,
      this._filteredCurrencyOptions$,
    ]).pipe(
      map(([currencyPairOptions, currencyOptions, filteredCurrencyOptions]) => ({
        currencyPairOptions,
        currencyOptions,
        filteredCurrencyOptions,
      }))
    );
  }

  public set currencyPairName(value: string | null) {
    this._currencyPairName$.next(value);
  }
}
