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
import { BaseComponent, TradeService, webRoutesConfig } from '../../../../common';
import { CurrencyTransactionResponse } from '../../../../common/domain-models/trade';

interface Pagination {
  page: number;
  size: number;
}

type Key =
  | 'id'
  | 'amount'
  | 'sourceWallet'
  | 'destinationWallet'
  | 'action'
  | 'status'
  | 'createdAt';

const KEYS: Record<Key, string> = {
  id: 'id',
  amount: 'Amount',
  sourceWallet: 'Source Wallet',
  destinationWallet: 'Destination Wallet',
  action: 'Action',
  status: 'Status',
  createdAt: 'Created At',
};

@Component({
  selector: 'app-manage-trades',
  templateUrl: './manage-trades.component.html',
  styleUrls: ['./manage-trades.component.scss'],
})
export class ManageTradesComponent extends BaseComponent {
  protected readonly tradeUrl = webRoutesConfig.trade;

  protected readonly title = 'Trade History';

  protected readonly subtitle = 'Your trade history.';
  protected readonly columns: Key[] = [
    'id',
    'amount',
    'sourceWallet',
    'destinationWallet',
    'action',
    'status',
    'createdAt',
  ];
  protected readonly keys = KEYS;
  protected search = '';

  protected readonly pagination$ = new BehaviorSubject<Pagination>({
    page: 0,
    size: 5,
  });

  protected readonly request$ = combineLatest([this.pagination$]).pipe(
    switchMap((query) => this._tradeService.getTrades(...query).pipe(startWith(null))),
    shareReplay(1)
  );

  protected trades$: Observable<readonly CurrencyTransactionResponse[]> = this.request$.pipe(
    filter(tuiIsPresent),
    map((transactionPage) => transactionPage.data),
    startWith([])
  );

  protected readonly total$: Observable<number> = this.request$.pipe(
    filter(tuiIsPresent),
    map((transactionPage) => transactionPage.total),
    startWith(1)
  );

  protected loading$ = this._loadingService.loading$;

  public constructor(
    private readonly _router: Router,
    private readonly _loadingService: LoadingService,
    private readonly _tradeService: TradeService
  ) {
    super();
  }

  public async onTrade(): Promise<void> {
    await this._router.navigate([this.tradeUrl]);
  }

  public isMatch(value: unknown): boolean {
    return !!this.search && TUI_DEFAULT_MATCHER(value, this.search);
  }

  public onPagination(pagination: Pagination): void {
    this.pagination$.next(pagination);
  }
}
