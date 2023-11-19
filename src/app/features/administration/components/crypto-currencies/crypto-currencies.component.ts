import { Component, EventEmitter, Inject, Output } from '@angular/core';
import {
  BehaviorSubject,
  combineLatest,
  filter,
  map,
  Observable,
  shareReplay,
  startWith,
  switchMap,
} from 'rxjs';
import { Router } from '@angular/router';
import { TUI_DEFAULT_MATCHER, tuiIsPresent } from '@taiga-ui/cdk';
import { LookupService } from '../../../../common/domain-services/lookup/lookup.service';
import { CryptoCurrencyResponse } from '../../../../common/domain-models';
import { LoadingService } from '../../../../core/services/loading/loading.service';
import { BaseComponent } from '../../../../common/components';
import { webRoutesConfig } from '../../../../common/config/web-routes-config';

interface Pagination {
  page: number;
  size: number;
}

type Key = 'code' | 'name' | 'symbol' | 'circulatingSupply' | 'actions';

const KEYS: Record<Key, string> = {
  code: 'Code',
  name: 'Name',
  symbol: 'Symbol',
  circulatingSupply: 'Circulating Supply',
  actions: 'actions',
};

@Component({
  selector: 'app-crypto-currencies',
  templateUrl: './crypto-currencies.component.html',
  styleUrls: ['./crypto-currencies.component.scss'],
})
export class CryptoCurrenciesComponent extends BaseComponent {
  @Output() public editCurrencyClicked = new EventEmitter<string>();
  protected readonly manageCurrenciesUrl = webRoutesConfig.manageCurrencies;
  protected readonly columns: Key[] = ['code', 'name', 'symbol', 'circulatingSupply', 'actions'];
  protected readonly keys = KEYS;
  protected search = '';

  protected readonly pagination$ = new BehaviorSubject<Pagination>({
    page: 0,
    size: 5,
  });

  protected readonly request$ = combineLatest([this.pagination$]).pipe(
    switchMap((query) => this.lookupService.getCryptoCurrencies(...query).pipe(startWith(null))),
    shareReplay(1)
  );

  protected cryptoCurrencies$: Observable<readonly CryptoCurrencyResponse[]> = this.request$.pipe(
    filter(tuiIsPresent),
    map((cryptoCurrencyPage) => cryptoCurrencyPage.data),
    startWith([])
  );

  protected total$: Observable<number> = this.request$.pipe(
    filter(tuiIsPresent),
    map((paymentPage) => paymentPage.total),
    startWith(1)
  );

  protected readonly loading$ = this.loadingService.loading$;

  public constructor(
    @Inject(Router) private readonly router: Router,
    @Inject(LoadingService) private readonly loadingService: LoadingService,
    @Inject(LookupService) private readonly lookupService: LookupService
  ) {
    super();
  }

  public async onEditCurrency(currencyCode: string): Promise<void> {
    this.editCurrencyClicked.emit(currencyCode);
  }

  public isMatch(value: unknown): boolean {
    return !!this.search && TUI_DEFAULT_MATCHER(value, this.search);
  }

  public onPagination(pagination: Pagination): void {
    this.pagination$.next(pagination);
  }
}
