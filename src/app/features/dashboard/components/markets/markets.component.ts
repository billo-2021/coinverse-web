import { Component, Inject } from '@angular/core';
import { webRoutesConfig } from '../../../../common/config/web-routes-config';
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
import { Router } from '@angular/router';
import { TUI_DEFAULT_MATCHER, tuiIsPresent } from '@taiga-ui/cdk';
import { BaseComponent } from '../../../../common/components';
import { LookupService } from '../../../../common/domain-services/lookup/lookup.service';
import { QuoteService } from '../../../../common/domain-services';
import { CryptoCurrencyResponse } from '../../../../common/domain-models';
import { CurrencyExchangeResponseData } from '../../../../common/domain-models/quote';
import { LoadingService } from '../../../../core/services/loading/loading.service';

type Key = 'name' | 'currencyPairName' | 'price' | 'change' | 'circulatingSupply' | 'actions';

interface Pagination {
  page: number;
  size: number;
}

const KEYS: Record<Key, string> = {
  name: 'Name',
  currencyPairName: 'Pair',
  price: 'Price $',
  change: '24hr %',
  circulatingSupply: 'Circulating Supply',
  actions: 'Actions',
};

type CryptoCurrencyModel = CryptoCurrencyResponse & {
  currencyPairName: string;
  price: number;
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
    'currencyPairName',
    'price',
    'change',
    'circulatingSupply',
    'actions',
  ];
  protected readonly keys = KEYS;

  protected total$: Observable<number>;
  protected readonly pagination$ = new BehaviorSubject({ page: 0, size: 5 });

  protected request$ = combineLatest([this.pagination$]).pipe(
    switchMap((query) => this.lookupService.getCryptoCurrencies(...query).pipe(startWith(null))),
    shareReplay(1)
  );

  protected cryptoCurrencies$ = this.request$.pipe(
    filter(tuiIsPresent),
    switchMap((currencyPage) => this.getCryptoCurrencyModels(currencyPage.data)),
    startWith([])
  );

  protected loading$ = this.loadingService.loading$;

  public constructor(
    @Inject(Router) private readonly router: Router,
    private readonly loadingService: LoadingService,
    @Inject(LookupService) private lookupService: LookupService,
    private readonly quoteService: QuoteService
  ) {
    super();
    this.total$ = this.request$.pipe(
      filter(tuiIsPresent),
      map((currencyPage) => currencyPage.total),
      startWith(1)
    );
  }

  public async onWithdraw(): Promise<void> {
    await this.router.navigate([this.transactUrl]);
  }

  public async onBuy(currencyCode: string): Promise<void> {
    const url = webRoutesConfig.trade;
    await this.router.navigate([url], {
      queryParams: {
        action: 'BUY',
        currencyPairName: this.getCurrencyPairName(currencyCode),
      },
    });
  }

  public async onSell(currencyCode: string): Promise<void> {
    const url = webRoutesConfig.trade;
    await this.router.navigate([url], {
      queryParams: {
        action: 'SELL',
        currencyPairName: this.getCurrencyPairName(currencyCode),
      },
    });
  }

  public async onDeposit(): Promise<void> {
    await this.router.navigate([this.transactUrl]);
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
              currencyPairName: this.getCurrencyPairName(currency.code),
              price: exchangeRate.askRate,
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
    return this.quoteService
      .getCurrencyExchangeRateByCurrencyPairName(currencyPairName)
      .pipe(map((currencyExchangeRates) => currencyExchangeRates.data[0]));
  }

  private getCurrencyPairName(currencyCode: string): string {
    return `${currencyCode}/USD`;
  }
}
