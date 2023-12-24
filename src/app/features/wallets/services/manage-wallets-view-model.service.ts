import { Inject, Injectable } from '@angular/core';
import {
  BehaviorSubject,
  combineLatest,
  filter,
  map,
  Observable,
  startWith,
  switchMap,
} from 'rxjs';

import { tuiIsPresent } from '@taiga-ui/cdk';

import { Pagination, paginationToken } from '../../../ui-components';
import { WalletService } from '../../../common';
import { WalletResponse } from '../../../common/domain-models/wallet';

import { ManageWalletsViewModel } from '../pages/manage-wallets/manage-wallets.view-model';

@Injectable({
  providedIn: 'root',
})
export class ManageWalletsViewModelService extends Observable<ManageWalletsViewModel> {
  protected readonly pagination$ = new BehaviorSubject<Pagination>(this._paginationToken);

  protected readonly request$ = combineLatest([this.pagination$]).pipe(
    switchMap((query) => this._walletService.getBalances(...query).pipe(startWith(null)))
  );

  protected wallets$: Observable<readonly WalletResponse[]> = this.request$.pipe(
    filter(tuiIsPresent),
    map((currencyPage) => currencyPage.data),
    startWith([])
  );

  protected readonly total$ = this.request$.pipe(
    filter(tuiIsPresent),
    map((currencyPage) => currencyPage.total),
    startWith(1)
  );

  private readonly _stream$: Observable<ManageWalletsViewModel> = combineLatest([
    this.pagination$,
    this.wallets$,
    this.total$,
  ]).pipe(map(([pagination, wallets, total]) => ({ pagination, wallets, total })));

  constructor(
    @Inject(paginationToken) private readonly _paginationToken: Pagination,
    private readonly _walletService: WalletService
  ) {
    super((subscriber) => this._stream$.subscribe(subscriber));
  }

  public set pagination(value: Pagination) {
    this.pagination$.next(value);
  }
}
