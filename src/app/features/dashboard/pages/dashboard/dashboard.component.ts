import {
  ChangeDetectionStrategy,
  Component,
  HostBinding,
  Inject,
  ViewEncapsulation,
} from '@angular/core';
import {
  BehaviorSubject,
  combineLatest,
  forkJoin,
  map,
  Observable,
  shareReplay,
  startWith,
  switchMap,
} from 'rxjs';
import { NavigationController, PageResponse, View, WebRoute } from '../../../../shared';
import { PAGE_OPTIONS, Pagination, PAGINATION_TOKEN } from '../../../../ui-components';
import {
  CryptoCurrency,
  CurrencyQuote,
  LookupService,
  QuoteService,
  Wallet,
  WalletService,
} from '../../../../domain';
import { CryptoCurrencyModel, WalletModel } from '../../models';

export interface DashboardViewModel {
  readonly wallets: readonly Wallet[];
  readonly walletCurrencyNames: readonly string[];
  readonly walletCurrencySymbols: readonly string[];
  readonly walletBalances: readonly number[];
  readonly totalBalance: number;
  readonly cryptoCurrencyPagination: Pagination;
  readonly cryptoCurrencyPage: PageResponse<CryptoCurrencyModel>;
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardComponent implements View<DashboardViewModel> {
  @HostBinding('class') private _classes = 'block';

  private readonly _walletModel$ = this.getWalletModel();
  private readonly _cryptoCurrencyPagination$ = new BehaviorSubject<Pagination>(this._pagination);

  private _cryptoCurrencyPage$ = combineLatest([this._cryptoCurrencyPagination$]).pipe(
    switchMap((query) => this._lookupService.getCryptoCurrencies(...query).pipe(shareReplay(1))),
    switchMap((currencyPage) => this.getCryptoCurrencyModelPage(currencyPage).pipe(shareReplay(1))),
    startWith(PAGE_OPTIONS)
  );

  public readonly viewModel$: Observable<DashboardViewModel> = combineLatest([
    this._walletModel$,
    this._cryptoCurrencyPagination$,
    this._cryptoCurrencyPage$,
  ]).pipe(
    map(([walletModel, cryptoCurrencyPagination, cryptoCurrencyPage]) => ({
      ...walletModel,
      cryptoCurrencyPagination,
      cryptoCurrencyPage,
    }))
  );

  public constructor(
    private readonly _navigationService: NavigationController,
    @Inject(PAGINATION_TOKEN) private readonly _pagination: Pagination,
    private readonly _walletService: WalletService,
    private readonly _lookupService: LookupService,
    private readonly _quoteService: QuoteService
  ) {}

  public set cryptoCurrencyPagination(value: Pagination) {
    this._cryptoCurrencyPagination$.next(value);
  }

  public onCryptoCurrencyPagination(pagination: Pagination): void {
    this.cryptoCurrencyPagination = pagination;
  }

  public onBuy(currencyPairName: string): void {
    this._navigationService
      .to({
        route: WebRoute.TRADE,
        queryParams: { action: 'buy', currencyPairName },
      })
      .then();
  }

  public onSell(currencyPairName: string): void {
    this._navigationService
      .to({
        route: WebRoute.TRADE,
        queryParams: { action: 'sell', currencyPairName },
      })
      .then();
  }

  public getCryptoCurrencyModelPage(
    cryptoCurrencyPage: PageResponse<CryptoCurrency>
  ): Observable<PageResponse<CryptoCurrencyModel>> {
    return forkJoin(this.cryptoCurrencyPageToCryptoCurrencyModels$(cryptoCurrencyPage)).pipe(
      map((cryptoCurrencies) => ({
        count: cryptoCurrencyPage.count,
        total: cryptoCurrencyPage.total,
        data: cryptoCurrencies,
      }))
    );
  }

  public getCurrencyExchangeRate(currency: CryptoCurrency): Observable<CurrencyQuote> {
    const currencyPairName = this.getCurrencyPairName(currency.code);
    return this._quoteService
      .getCurrencyExchangeRateByCurrencyPairName(currencyPairName)
      .pipe(map((currencyExchangeRates) => currencyExchangeRates.quotes[0]));
  }

  private cryptoCurrencyPageToCryptoCurrencyModels$(
    cryptoCurrencyPage: PageResponse<CryptoCurrency>
  ): Observable<CryptoCurrencyModel>[] {
    return cryptoCurrencyPage.data.map((currency) =>
      this.getCurrencyExchangeRate(currency).pipe(
        map((currencyQuote) => ({ ...currency, ...currencyQuote, change: 0 }))
      )
    );
  }

  private getWalletModel(): Observable<WalletModel> {
    return this._walletService.getBalances({ page: 0, size: 100 }).pipe(
      map((walletPageResponse) => {
        const sortedWalletResponse = walletPageResponse.data
          .sort((a, b) => b.balance - a.balance)
          .slice(0, 5);

        return sortedWalletResponse.reduce(
          (viewModel: WalletModel, walletResponse: Wallet) => ({
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
          }
        );
      })
    );
  }

  private getCurrencyPairName(currencyCode: string): string {
    return `${currencyCode}/USD`;
  }
}
