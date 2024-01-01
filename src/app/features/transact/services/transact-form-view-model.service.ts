import { Injectable, SkipSelf } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { BehaviorSubject, combineLatest, map, Observable, shareReplay, startWith, tap } from 'rxjs';

import { ListOption } from '../../../form-components';
import { ListOptionsService, WalletService } from '../../../common';
import { CurrencyResponse, PaymentMethodResponse } from '../../../common/domain-models/lookup';
import { WalletResponse } from '../../../common/domain-models/wallet';

import { TransactFormViewModel } from '../components/transact-form/transact-form.view-model';
import { TransactForm } from '../models';
import { TransactFormService } from './transact-form.service';

@Injectable({
  providedIn: 'root',
})
export class TransactFormViewModelService extends Observable<TransactFormViewModel> {
  private readonly currencyCode$ = new BehaviorSubject<string | null>(null);
  private readonly form: FormGroup<TransactForm>;
  private readonly paymentMethodOptions$: Observable<ListOption<PaymentMethodResponse>[]>;
  private readonly currencyOptions$: Observable<ListOption<CurrencyResponse>[]>;
  private readonly walletOptions$: Observable<ListOption<WalletResponse>[]>;
  private readonly walletCurrencyCode$: Observable<[ListOption<WalletResponse>[], string | null]>;
  private readonly selectedWallet$: Observable<ListOption<WalletResponse> | null>;

  private readonly _stream$: Observable<TransactFormViewModel>;

  constructor(
    @SkipSelf() private readonly _transactForm: TransactFormService,
    private readonly _listOptionsService: ListOptionsService,
    private readonly _walletService: WalletService
  ) {
    super((subscriber) => this._stream$.subscribe(subscriber));

    this.form = _transactForm.value;

    this.paymentMethodOptions$ = _listOptionsService.getPaymentMethodOptions().pipe(
      startWith([]),
      tap((paymentMethods) => {
        if (!paymentMethods.length) {
          return;
        }

        this.form.controls.paymentMethod.setValue(paymentMethods[0]);
      })
    );

    this.currencyOptions$ = _listOptionsService.getFiatCurrencyOptions().pipe(
      startWith([]),
      shareReplay(1),
      tap((currencyOptions) => {
        if (!currencyOptions.length) {
          return;
        }

        this.form.controls.amountCurrency.setValue(currencyOptions[0]);
      })
    );

    this.walletOptions$ = _listOptionsService
      .getWalletOptions()
      .pipe(startWith([]), shareReplay(1));

    this.walletCurrencyCode$ = combineLatest([
      this.walletOptions$,
      this.currencyCode$.asObservable(),
    ]).pipe(
      tap(([walletOptions, currencyCode]) => {
        if (!currencyCode) {
          return;
        }

        const foundWalletOption = walletOptions.find(
          (option) => option.value.currency.code.toLowerCase() === currencyCode.toLowerCase()
        );

        if (!foundWalletOption) {
          return;
        }

        this.form.controls.wallet.setValue(foundWalletOption);
      })
    );

    this.selectedWallet$ = this.form.controls.wallet.valueChanges.pipe(
      startWith<ListOption<WalletResponse> | null>(null)
    );

    this._stream$ = combineLatest([
      this.paymentMethodOptions$,
      this.currencyOptions$,
      this.walletOptions$,
      this.selectedWallet$,
      this.walletCurrencyCode$,
    ]).pipe(
      map(([paymentMethodOptions, currencyOptions, walletOptions, selectedWallet]) => ({
        paymentMethodOptions,
        currencyOptions,
        walletOptions,
        selectedWallet,
      }))
    );
  }

  public set currencyCode(currencyCode: string | null) {
    this.currencyCode$.next(currencyCode);
  }
}
