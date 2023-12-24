import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { combineLatest, map, Observable, Subject, tap } from 'rxjs';

import { LookupService } from '../../../../common';
import { CurrencyPairResponse, CurrencyResponse } from '../../../../common/domain-models/lookup';

import { ListOption } from '../../../../form-components';
import { TradeModel } from '../../models';

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
})
export class TradeFormComponent {
  public form: FormGroup;
  @Input() public activeTabIndex = 0;
  @Output() public actionClicked = new EventEmitter<TradeModel>();
  @Output() public activeTabIndexChange = new EventEmitter<number>();
  protected readonly tabs: Tab[] = [
    { text: 'BUY', icon: null, isDisabled: false },
    { text: 'SELL', icon: null, isDisabled: false },
  ];
  protected readonly action = ACTION;
  protected readonly currencyPairOptions$: Observable<ListOption<CurrencyPairResponse>[]>;
  protected readonly currencyOptions$: Observable<ListOption<CurrencyResponse>[]>;
  protected readonly filteredCurrencyOptions$: Observable<ListOption<CurrencyResponse>[]>;
  private currencyPairName$ = new Subject<string>();

  public constructor(
    private readonly _lookupService: LookupService,
    private readonly _formBuilder: FormBuilder
  ) {
    this.form = this.getTradeForm(_formBuilder);

    this.currencyPairOptions$ = _lookupService.getAllCurrencyPairs().pipe(
      map((currencyPairs) => {
        return currencyPairs.map((currencyPair) => ({
          code: currencyPair.type,
          name: currencyPair.name,
          value: currencyPair,
          avatar: currencyPair.type,
        }));
      })
    );

    this.currencyOptions$ = _lookupService.getAllCurrencies().pipe(
      map((currencyResponse) =>
        currencyResponse.map((currency) => ({
          code: currency.code,
          name: currency.name,
          avatar: currency.code,
          value: currency,
        }))
      ),
      tap((currencyOptions) => {
        this.form?.controls['amountCurrency']?.setValue(currencyOptions[0]);
      })
    );

    combineLatest([this.currencyPairName$, this.currencyPairOptions$, this.currencyOptions$])
      .pipe(
        tap(([currencyPairName, currencyPairOptions]) => {
          const foundCurrencyPair = currencyPairOptions.find((currencyPairOption) =>
            currencyPairOption.name.toLowerCase().includes(currencyPairName.toLowerCase())
          );

          if (!foundCurrencyPair || !this.form) {
            return;
          }

          this.form.controls['currencyPair'].setValue(foundCurrencyPair);
        })
      )
      .subscribe();

    this.filteredCurrencyOptions$ = combineLatest([
      this.currencyOptions$,
      this.form.controls['currencyPair'].valueChanges,
    ]).pipe(
      map(([currencyOptions, control]) => {
        this.form.controls['amountCurrency'].setValue(null);

        const option = control?.value as ListOption<CurrencyPairResponse> | null;

        if (!option) {
          return currencyOptions;
        }

        const currencyPair = option.value;

        const baseCurrency = currencyPair.baseCurrency;
        const quoteCurrency = currencyPair.quoteCurrency;

        const filteredCurrencyOptions = currencyOptions.filter(
          (option) => option.code === baseCurrency.code || option.code == quoteCurrency.code
        );

        if (filteredCurrencyOptions.length) {
          this.form.controls['amountCurrency'].setValue(filteredCurrencyOptions[0]);
        }

        return filteredCurrencyOptions;
      })
    );
  }

  @Input()
  public set CurrencyPairName(currencyPairName: string | null) {
    if (!currencyPairName) {
      return;
    }

    this.currencyPairName$.next(currencyPairName);
  }

  public onActiveTabIndexChange(index: number): void {
    this.activeTabIndexChange.emit(index);
  }

  public onAction(): void {
    const trade: TradeModel = {
      currencyPairName: this.form.controls['currencyPair'].value.name,
      amountCurrency: this.form.controls['amountCurrency'].value.code,
      amount: this.form.controls['amount'].value,
    };
    this.actionClicked.emit(trade);
  }

  private getTradeForm(formBuilder: FormBuilder): FormGroup {
    return formBuilder.group({
      currencyPair: [null, [Validators.required]],
      amountCurrency: [null, [Validators.required]],
      amount: [0.0, [Validators.required, Validators.min(1)]],
    });
  }
}
