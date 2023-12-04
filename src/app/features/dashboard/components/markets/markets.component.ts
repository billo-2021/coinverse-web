import { Component, HostBinding } from '@angular/core';
import { Router } from '@angular/router';
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

import { TUI_DEFAULT_MATCHER, tuiIsPresent } from '@taiga-ui/cdk';

import { LoadingService } from '../../../../core';
import { BaseComponent, LookupService, QuoteService, webRoutesConfig } from '../../../../common';

import { CryptoCurrencyResponse } from '../../../../common/domain-models/lookup';
import { CurrencyExchangeResponseData } from '../../../../common/domain-models/quote';

type Key = 'name' | 'askRate' | 'bidRate' | 'change' | 'circulatingSupply' | 'actions';

interface Pagination {
  page: number;
  size: number;
}

const KEYS: Record<Key, string> = {
  name: 'Name',
  askRate: 'Sell $',
  bidRate: 'Buy $',
  change: '24hr %',
  circulatingSupply: 'Circulating Supply',
  actions: '',
};

type CryptoCurrencyModel = CryptoCurrencyResponse & {
  askRate: number;
  bidRate: number;
};

@Component({
  selector: 'app-markets',
  templateUrl: './markets.component.html',
  styleUrls: ['./markets.component.scss'],
})
export class MarketsComponent extends BaseComponent {
  protected readonly transactUrl = webRoutesConfig.transact;
  protected readonly title = 'Markets';
  protected readonly subtitle = 'Latest market prices.';
  protected search = '';
  protected readonly columns: Key[] = [
    'name',
    'askRate',
    'bidRate',
    'change',
    'circulatingSupply',
    'actions',
  ];
  protected readonly keys = KEYS;
  protected total$: Observable<number>;
  protected readonly pagination$ = new BehaviorSubject({ page: 0, size: 5 });
  protected request$ = combineLatest([this.pagination$]).pipe(
    switchMap((query) => this._lookupService.getCryptoCurrencies(...query).pipe(startWith(null))),
    shareReplay(1)
  );
  protected cryptoCurrencies$ = this.request$.pipe(
    filter(tuiIsPresent),
    switchMap((currencyPage) => this.getCryptoCurrencyModels(currencyPage.data)),
    startWith([])
  );
  protected loading$ = this._loadingService.loading$;
  @HostBinding('class') private _classes = 'block';

  public constructor(
    private readonly _router: Router,
    private readonly _loadingService: LoadingService,
    private readonly _lookupService: LookupService,
    private readonly _quoteService: QuoteService
  ) {
    super();
    this.total$ = this.request$.pipe(
      filter(tuiIsPresent),
      map((currencyPage) => currencyPage.total),
      startWith(1)
    );
  }

  public async onWithdraw(): Promise<void> {
    await this._router.navigate([this.transactUrl]);
  }

  public async onBuy(currencyCode: string): Promise<void> {
    const url = webRoutesConfig.trade;
    await this._router.navigate([url], {
      queryParams: {
        action: 'BUY',
        currencyPairName: this.getCurrencyPairName(currencyCode),
      },
    });
  }

  public async onSell(currencyCode: string): Promise<void> {
    const url = webRoutesConfig.trade;
    await this._router.navigate([url], {
      queryParams: {
        action: 'SELL',
        currencyPairName: this.getCurrencyPairName(currencyCode),
      },
    });
  }

  public async onDeposit(): Promise<void> {
    await this._router.navigate([this.transactUrl]);
  }

  public isMatch(value: unknown): boolean {
    return !!this.search && TUI_DEFAULT_MATCHER(value, this.search);
  }

  public onPagination(pagination: Pagination): void {
    this.pagination$.next(pagination);
  }

  public getCryptoCurrencyModels(
    cryptoCurrencies: CryptoCurrencyResponse[]
  ): Observable<CryptoCurrencyModel[]> {
    return forkJoin(
      cryptoCurrencies.map((currency) => {
        return this.getCurrencyExchangeRate(currency).pipe(
          map((exchangeRate) => {
            return {
              id: currency.id,
              code: currency.code,
              name: currency.name,
              symbol: currency.symbol,
              circulatingSupply: currency.circulatingSupply,
              askRate: exchangeRate.askRate,
              bidRate: exchangeRate.bidRate,
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

  private getCurrencyPairName(currencyCode: string): string {
    return `${currencyCode}/USD`;
  }
}
