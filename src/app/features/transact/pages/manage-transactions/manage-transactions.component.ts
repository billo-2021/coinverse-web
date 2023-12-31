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
import { BaseComponent, TransactService, webRoutesConfig } from '../../../../common';
import { PaymentResponse } from '../../../../common/domain-models/transact';

interface Pagination {
  page: number;
  size: number;
}

type Key = 'id' | 'amount' | 'method' | 'action' | 'status' | 'createdAt';

const KEYS: Record<Key, string> = {
  id: 'Id',
  amount: 'Amount',
  method: 'Method',
  action: 'Action',
  status: 'Status',
  createdAt: 'Created At',
};

@Component({
  selector: 'app-manage-transactions',
  templateUrl: './manage-transactions.component.html',
  styleUrls: ['./manage-transactions.component.scss'],
})
export class ManageTransactionsComponent extends BaseComponent {
  protected readonly transactUrl = webRoutesConfig.transact;
  protected readonly title = 'Transaction History';

  protected readonly subtitle = 'Your transaction history.';
  protected readonly columns: Key[] = ['id', 'amount', 'method', 'action', 'status', 'createdAt'];
  protected readonly keys = KEYS;
  protected search = '';

  protected readonly pagination$ = new BehaviorSubject<Pagination>({
    page: 0,
    size: 5,
  });
  protected readonly request$ = combineLatest([this.pagination$]).pipe(
    switchMap((query) => this._transactService.getTransactions(...query).pipe(startWith(null))),
    shareReplay(1)
  );

  protected payments$: Observable<readonly PaymentResponse[]> = this.request$.pipe(
    filter(tuiIsPresent),
    map((paymentPage) => paymentPage.data),
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
    private readonly _transactService: TransactService
  ) {
    super();
  }

  public async onWithdraw(): Promise<void> {
    await this._router.navigate([this.transactUrl]);
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
}
