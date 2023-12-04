import { Component } from '@angular/core';
import { Router } from '@angular/router';
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
import { TUI_DEFAULT_MATCHER, tuiIsPresent } from '@taiga-ui/cdk';

import { LoadingService } from '../../../../core';
import { BaseComponent, LookupService, webRoutesConfig } from '../../../../common';
import { CurrencyResponse } from '../../../../common/domain-models/lookup';

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
  protected readonly manageCurrenciesUrl = webRoutesConfig.manageCurrencies;
  protected readonly columns: Key[] = ['code', 'name', 'symbol'];
  protected readonly keys = KEYS;
  protected search = '';

  protected readonly pagination$ = new BehaviorSubject<Pagination>({
    page: 0,
    size: 5,
  });

  protected readonly request$ = combineLatest([this.pagination$]).pipe(
    switchMap((query) =>
      this._lookupService.getCurrenciesByType('fiat', ...query).pipe(startWith(null))
    ),
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

  protected readonly loading$ = this._loadingService.loading$;

  public constructor(
    private readonly _router: Router,
    private readonly _loadingService: LoadingService,
    private readonly _lookupService: LookupService
  ) {
    super();
  }

  public async onEditCurrency(currencyCode: string): Promise<void> {
    const url = `${this.manageCurrenciesUrl}/${currencyCode}`;
    await this._router.navigate([url]);
  }

  public isMatch(value: unknown): boolean {
    return !!this.search && TUI_DEFAULT_MATCHER(value, this.search);
  }

  public onPagination(pagination: Pagination): void {
    this.pagination$.next(pagination);
  }
}
