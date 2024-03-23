import { Inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Mapper } from '@dynamic-mapper/angular';
import { MAX_PAGE_REQUEST_TOKEN, PageRequest } from '../../../shared';
import { ListOption } from '../../../form-components';
import { Country, Currency, CurrencyPair, PaymentMethod, UserRole, Wallet } from '../../models';
import { MappingProfile } from '../../config';
import { LookupService, WalletService } from '../../services';

@Injectable({
  providedIn: 'root',
})
export class ListOptionsService {
  constructor(
    private readonly _mapper: Mapper,
    @Inject(MAX_PAGE_REQUEST_TOKEN) private readonly _maxPageRequest: PageRequest,
    private readonly _lookupService: LookupService,
    private readonly _walletService: WalletService
  ) {}

  public getCountryOptions(): Observable<ListOption<Country>[]> {
    return this._lookupService
      .getAllCountries()
      .pipe(
        map((countries) =>
          this._mapper.map<Country, ListOption<Country>>(
            MappingProfile.CurrencyToCurrencyListOption,
            countries
          )
        )
      );
  }

  public getCurrencyOptions(): Observable<ListOption<Currency>[]> {
    return this._lookupService
      .getAllCurrencies()
      .pipe(
        map((currencies) =>
          this._mapper.map<Currency, ListOption<Currency>>(
            MappingProfile.CurrencyToCurrencyListOption,
            currencies
          )
        )
      );
  }

  public getCurrencyPairOptions(): Observable<ListOption<CurrencyPair>[]> {
    return this._lookupService
      .getAllCurrencyPairs()
      .pipe(
        map((currencyPairs) =>
          this._mapper.map<CurrencyPair, ListOption<CurrencyPair>>(
            MappingProfile.CurrencyPairToCurrencyPairListOption,
            currencyPairs
          )
        )
      );
  }

  public getFiatCurrencyOptions(): Observable<ListOption<Currency>[]> {
    return this._lookupService
      .getAllCurrenciesByType('fiat')
      .pipe(
        map((currencies) =>
          this._mapper.map<Currency, ListOption<Currency>>(
            MappingProfile.CurrencyToCurrencyListOption,
            currencies
          )
        )
      );
  }

  public getPaymentMethodOptions(): Observable<ListOption<PaymentMethod>[]> {
    return this._lookupService
      .getAllPaymentMethods()
      .pipe(
        map((paymentMethods) =>
          this._mapper.map<PaymentMethod, ListOption<PaymentMethod>>(
            MappingProfile.PaymentMethodToPaymentMethodListOption,
            paymentMethods
          )
        )
      );
  }

  public getWalletOptions(): Observable<ListOption<Wallet>[]> {
    return this._walletService
      .getBalances(this._maxPageRequest)
      .pipe(
        map((walletPage) =>
          walletPage.data.map((wallet) =>
            this._mapper.map<Wallet, ListOption<Wallet>>(
              MappingProfile.WalletToWalletListOption,
              wallet
            )
          )
        )
      );
  }

  public getUserRoleOptions(): Observable<ListOption<UserRole>[]> {
    return this._lookupService
      .getAllUserRoles()
      .pipe(
        map((userRoles) => this._mapper.map(MappingProfile.UserRoleToUserRoleListOption, userRoles))
      );
  }
}
