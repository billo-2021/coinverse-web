import { Inject, Injectable } from '@angular/core';

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

import { tuiIsPresent } from '@taiga-ui/cdk';

import { Pagination, paginationToken } from '../../../ui-components';
import { TransactService } from '../../../common';

import { PaymentResponse } from '../../../common/domain-models/transact';
import { ManageTransactionsViewModel } from '../pages/manage-transactions/manage-transactions.view-model';

@Injectable({
  providedIn: 'root',
})
export class ManageTransactionsViewModelService extends Observable<ManageTransactionsViewModel> {
  private readonly _pagination$ = new BehaviorSubject<Pagination>(this._paginationToken);

  private readonly _request$ = combineLatest([this._pagination$.asObservable()]).pipe(
    switchMap((query) => this._transactService.getTransactions(...query).pipe(startWith(null))),
    shareReplay(1)
  );

  private readonly _payments$: Observable<readonly PaymentResponse[]> = this._request$.pipe(
    filter(tuiIsPresent),
    map((paymentPage) => paymentPage.data),
    startWith([])
  );

  private readonly _total$: Observable<number> = this._request$.pipe(
    filter(tuiIsPresent),
    map((paymentPage) => paymentPage.total),
    startWith(1)
  );

  private readonly _stream$: Observable<ManageTransactionsViewModel> = combineLatest([
    this._pagination$,
    this._payments$,
    this._total$,
  ]).pipe(map(([pagination, payments, total]) => ({ pagination, payments, total })));

  constructor(
    @Inject(paginationToken) private readonly _paginationToken: Pagination,
    private readonly _transactService: TransactService
  ) {
    super((subscriber) => this._stream$.subscribe(subscriber));
  }

  public set pagination(value: Pagination) {
    this._pagination$.next(value);
  }
}
