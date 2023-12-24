import { Inject, Injectable } from '@angular/core';
import {
  BehaviorSubject,
  combineLatest,
  filter,
  forkJoin,
  map,
  Observable,
  shareReplay,
  startWith,
  switchMap,
} from 'rxjs';

import { tuiIsPresent } from '@taiga-ui/cdk';

import { LookupService, QuoteService, WalletService } from '../../../common';
import { CryptoCurrencyResponse } from '../../../common/domain-models/lookup';
import { CurrencyExchangeResponseData } from '../../../common/domain-models/quote';
import { Pagination, paginationToken } from '../../../ui-components';

import { CryptoCurrencyModel, WalletModel } from '../models';
import { DashboardViewModel } from '../pages/dashboard/dashboard.view-model';

@Injectable({
  providedIn: 'root',
})
export class DashboardViewModelService extends Observable<DashboardViewModel> {
  protected readonly walletModel$ = this.getWalletModel();
  protected readonly cryptoCurrencyPagination$ = new BehaviorSubject(this._paginationToken);

  protected cryptoCurrencyRequest$ = combineLatest([this.cryptoCurrencyPagination$]).pipe(
    switchMap((query) => this._lookupService.getCryptoCurrencies(...query).pipe(startWith(null))),
    shareReplay(1)
  );

  protected cryptoCurrencies$ = this.cryptoCurrencyRequest$.pipe(
    filter(tuiIsPresent),
    switchMap((currencyPage) => this.getCryptoCurrencyModels(currencyPage.data)),
    startWith([])
  );

  protected totalCryptoCurrencies$ = this.cryptoCurrencyRequest$.pipe(
    filter(tuiIsPresent),
    map((currencyPage) => currencyPage.total),
    startWith(1)
  );

  private readonly _stream$: Observable<DashboardViewModel> = combineLatest([
    this.walletModel$,
    this.cryptoCurrencyPagination$,
    this.cryptoCurrencies$,
    this.totalCryptoCurrencies$,
  ]).pipe(
    map(([walletModel, cryptoCurrencyPagination, cryptoCurrencies, totalCryptoCurrencies]) => ({
      ...walletModel,
      cryptoCurrencyPagination,
      cryptoCurrencies,
      totalCryptoCurrencies,
    }))
  );

  constructor(
    @Inject(paginationToken) private readonly _paginationToken: Pagination,
    private readonly _walletService: WalletService,
    private readonly _lookupService: LookupService,
    private readonly _quoteService: QuoteService
  ) {
    super((subscriber) => this._stream$.subscribe(subscriber));
  }

  public set cryptoCurrencyPagination(page: Pagination) {
    this.cryptoCurrencyPagination$.next(page);
  }

  public getCryptoCurrencyModels(
    cryptoCurrencies: CryptoCurrencyResponse[]
  ): Observable<CryptoCurrencyModel[]> {
    return forkJoin(
      cryptoCurrencies.map((currency) => {
        return this.getCurrencyExchangeRate(currency).pipe(
          map((exchangeRate) => {
            const { askRate, bidRate } = exchangeRate;

            return {
              ...currency,
              ...exchangeRate,
              askRate,
              bidRate,
              change: 0,
            };
          })
        );
      })
    );
  }

  public getCurrencyExchangeRate(
    currency: CryptoCurrencyResponse
  ): Observable<CurrencyExchangeResponseData> {
    const currencyPairName = this.getCurrencyPairName(currency.code);
    return this._quoteService
      .getCurrencyExchangeRateByCurrencyPairName(currencyPairName)
      .pipe(map((currencyExchangeRates) => currencyExchangeRates.data[0]));
  }

  private getWalletModel(): Observable<WalletModel> {
    return this._walletService.getBalances({ page: 0, size: 100 }).pipe(
      map((walletPageResponse) => {
        const sortedWalletResponse = walletPageResponse.data
          .sort((a, b) => b.balance - a.balance)
          .slice(0, 5);

        return sortedWalletResponse.reduce(
          (viewModel, walletResponse) => ({
            wallets: [...viewModel.wallets, walletResponse],
            walletCurrencyNames: [...viewModel.walletCurrencyNames, walletResponse.currency.name],
            walletCurrencySymbols: [
              ...viewModel.walletCurrencySymbols,
              walletResponse.currency.symbol,
            ],
            walletBalances: [...viewModel.walletBalances, walletResponse.balance],
            totalBalance: viewModel.totalBalance + walletResponse.balance,
          }),
          {
            wallets: [],
            walletCurrencyNames: [],
            walletCurrencySymbols: [],
            walletBalances: [],
            totalBalance: 0,
          } as WalletModel
        );
      })
    );
  }

  private getCurrencyPairName(currencyCode: string): string {
    return `${currencyCode}/USD`;
  }
}
