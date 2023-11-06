import { Component, Inject } from '@angular/core';
import { webRoutesConfig } from '../../../../common/config/web-routes-config';
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
import { CurrencyResponse } from '../../../../common/domain-models';
import { TUI_DEFAULT_MATCHER, tuiIsPresent } from '@taiga-ui/cdk';
import { Router } from '@angular/router';
import { LoadingService } from '../../../../core/services/loading/loading.service';
import { LookupService } from '../../../../common/domain-services/lookup/lookup.service';
import { BaseComponent } from '../../../../common/components';

interface Pagination {
  page: number;
  size: number;
}

type Key = 'code' | 'name' | 'symbol';

const KEYS: Record<Key, string> = {
  code: 'Code',
  name: 'Name',
  symbol: 'Symbol',
};

@Component({
  selector: 'app-fiat-currencies',
  templateUrl: './fiat-currencies.component.html',
  styleUrls: ['./fiat-currencies.component.scss'],
})
export class FiatCurrenciesComponent extends BaseComponent {
  protected readonly manageCurrenciesUrl = webRoutesConfig.administration.manageCurrencies;
  protected readonly columns: Key[] = ['code', 'name', 'symbol'];
  protected readonly keys = KEYS;
  protected search = '';

  protected readonly pagination$ = new BehaviorSubject<Pagination>({
    page: 0,
    size: 5,
  });

  protected readonly request$ = combineLatest([this.pagination$]).pipe(
    switchMap((query) => this.lookupService.getCurrenciesByType('fiat', ...query).pipe(startWith(null))),
    shareReplay(1)
  );

  protected currencies$: Observable<readonly CurrencyResponse[]> = this.request$.pipe(
    filter(tuiIsPresent),
    map((currencyPage) => currencyPage.data),
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
    const url = `${this.manageCurrenciesUrl}/${currencyCode}`;
    await this.router.navigate([url]);
  }

  public isMatch(value: unknown): boolean {
    return !!this.search && TUI_DEFAULT_MATCHER(value, this.search);
  }

  public onPagination(pagination: Pagination): void {
    this.pagination$.next(pagination);
  }
}
