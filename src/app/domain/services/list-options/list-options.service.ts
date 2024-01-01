import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';

import { ListOption, ListOptionUtils } from '../../../form-components';

import { LookupService, WalletService } from '../../domain-services';
import {
  CurrencyPairResponse,
  CurrencyResponse,
  PaymentMethodResponse,
} from '../../domain-models/lookup';

@Injectable({
  providedIn: 'root',
})
export class ListOptionsService {
  constructor(
    private readonly _lookupService: LookupService,
    private readonly _walletService: WalletService
  ) {}

  public getCurrencyOptions(): Observable<ListOption<CurrencyResponse>[]> {
    return this._lookupService.getAllCurrencies().pipe(
      map((currencyResponse) =>
        currencyResponse.map((currency) => ({
          code: currency.code,
          name: currency.name,
          avatar: currency.code,
          value: currency,
        }))
      )
    );
  }

  public getCurrencyPairOptions(): Observable<ListOption<CurrencyPairResponse>[]> {
    return this._lookupService.getAllCurrencyPairs().pipe(
      map((currencyPairs) => {
        return currencyPairs.map((currencyPair) => ({
          code: currencyPair.type,
          name: currencyPair.name,
          value: currencyPair,
          avatar: currencyPair.type,
        }));
      })
    );
  }

  public getFiatCurrencyOptions(): Observable<ListOption<CurrencyResponse>[]> {
    return this._lookupService
      .getAllCurrenciesByType('fiat')
      .pipe(
        map((response) =>
          response.map((currencyResponse) => ListOptionUtils.toListOption(currencyResponse))
        )
      );
  }

  public getPaymentMethodOptions(): Observable<ListOption<PaymentMethodResponse>[]> {
    return this._lookupService
      .getAllPaymentMethods()
      .pipe(
        map((response) =>
          response.map((paymentMethodResponse) =>
            ListOptionUtils.toListOption(paymentMethodResponse)
          )
        )
      );
  }

  public getWalletOptions() {
    return this._walletService.getBalances({ page: 0, size: 100 }).pipe(
      map((response) =>
        response.data.map((wallet) => ({
          code: wallet.currency.code,
          name: wallet.currency.name + ' Wallet',
          avatar: wallet.currency.code,
          value: wallet,
        }))
      )
    );
  }
}
