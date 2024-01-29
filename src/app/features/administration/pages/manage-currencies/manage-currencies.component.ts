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
  map,
  Observable,
  shareReplay,
  startWith,
  switchMap,
} from 'rxjs';
import { PageResponse } from '../../../../core';
import { NavigationService, ViewPage } from '../../../../common';
import { PAGE_OPTIONS, Pagination, paginationToken, Tab } from '../../../../ui-components';
import { CryptoCurrency, Currency, LookupService } from '../../../../domain';

export enum CurrencyTab {
  CryptoCurrencies,
  FiatCurrencies,
}

export enum CurrencyType {
  fiat = 'fiat',
  crypto = 'crypto',
}

export type CurrencyTabsType = readonly [Tab, Tab];
export type CurrencyTabType = typeof CurrencyTab;

export interface ManageCurrenciesViewModel {
  readonly activeTabIndex: CurrencyTab;
  readonly cryptoCurrenciesPagination: Pagination;
  readonly cryptoCurrencyPage: PageResponse<CryptoCurrency>;
  readonly fiatCurrenciesPagination: Pagination;
  readonly fiatCurrencyPage: PageResponse<Currency>;
}

export const CURRENCY_TABS: CurrencyTabsType = [
  { text: 'Crypto', icon: 'tuiIconKey', isDisabled: false },
  { text: 'Fiat', icon: 'tuiIconDollarSign', isDisabled: false },
];

@Component({
  selector: 'app-manage-currencies',
  templateUrl: './manage-currencies.component.html',
  styleUrls: ['./manage-currencies.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ManageCurrenciesComponent implements ViewPage<ManageCurrenciesViewModel> {
  public readonly title: string = 'Manage Currencies';
  public readonly subtitle: string = 'Manage currencies here.';
  public readonly CurrencyTabs: CurrencyTabsType = CURRENCY_TABS;
  public readonly CurrencyTabType: CurrencyTabType = CurrencyTab;
  @HostBinding('class') private _classes = 'block';
  private readonly _activeTabIndex$ = new BehaviorSubject<CurrencyTab>(
    CurrencyTab.CryptoCurrencies
  );

  private readonly _cryptoCurrenciesPagination$ = new BehaviorSubject<Pagination>(
    this._paginationToken
  );

  private readonly _cryptoCurrencyPage$ = combineLatest([this._cryptoCurrenciesPagination$]).pipe(
    switchMap((query) => this._lookupService.getCryptoCurrencies(...query).pipe(shareReplay(1))),
    startWith<PageResponse<CryptoCurrency>>(PAGE_OPTIONS)
  );

  private readonly _fiatCurrenciesPagination$ = new BehaviorSubject<Pagination>(
    this._paginationToken
  );

  private readonly _fiatCurrencyPage$ = combineLatest([this._fiatCurrenciesPagination$]).pipe(
    switchMap((query) =>
      this._lookupService.getCurrenciesByType(CurrencyType.fiat, ...query).pipe(shareReplay(1))
    ),
    startWith<PageResponse<Currency>>(PAGE_OPTIONS)
  );

  public readonly viewModel$: Observable<ManageCurrenciesViewModel> = combineLatest([
    this._activeTabIndex$,
    this._cryptoCurrenciesPagination$,
    this._cryptoCurrencyPage$,
    this._fiatCurrenciesPagination$,
    this._fiatCurrencyPage$,
  ]).pipe(
    map(
      ([
        activeTabIndex,
        cryptoCurrenciesPagination,
        cryptoCurrencyPage,
        fiatCurrenciesPagination,
        fiatCurrencyPage,
      ]) => ({
        activeTabIndex,
        cryptoCurrenciesPagination,
        cryptoCurrencyPage,
        fiatCurrenciesPagination,
        fiatCurrencyPage,
      })
    )
  );

  public constructor(
    @Inject(paginationToken) private readonly _paginationToken: Pagination,
    private readonly _navigationService: NavigationService,
    private readonly _lookupService: LookupService
  ) {}

  public set activeTabIndex(value: CurrencyTab) {
    this._activeTabIndex$.next(value);
  }

  public set cryptoCurrenciesPagination(pagination: Pagination) {
    this._cryptoCurrenciesPagination$.next(pagination);
  }

  public set fiatCurrenciesPagination(pagination: Pagination) {
    this._fiatCurrenciesPagination$.next(pagination);
  }

  public activeTabIndexChanged(activeTabIndex: CurrencyTab) {
    this.activeTabIndex = activeTabIndex;
  }

  public cryptoCurrenciesPaginationChanged(pagination: Pagination): void {
    this.cryptoCurrenciesPagination = pagination;
  }

  public fiatCurrenciesPaginationChanged(pagination: Pagination): void {
    this.fiatCurrenciesPagination = pagination;
  }

  public onEditCurrency(currencyCode: string): void {
    this._navigationService.to({ route: 'manageCurrencies', routePath: currencyCode }).then();
  }

  public onAddCurrency(): void {
    this._navigationService.to('newCurrency').then();
  }
}
