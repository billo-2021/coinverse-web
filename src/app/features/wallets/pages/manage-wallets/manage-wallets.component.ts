import { Component } from '@angular/core';
import { Router } from '@angular/router';

import {
  BehaviorSubject,
  combineLatest,
  filter,
  map,
  Observable,
  startWith,
  switchMap,
} from 'rxjs';

import { TUI_DEFAULT_MATCHER, tuiIsPresent } from '@taiga-ui/cdk';

import { LoadingService } from '../../../../core';
import { BaseComponent, WalletService, webRoutesConfig } from '../../../../common';
import { WalletResponse } from '../../../../common/domain-models/wallet';

interface Pagination {
  page: number;
  size: number;
}

type Key = 'id' | 'address' | 'code' | 'name' | 'balance' | 'actions';

const KEYS: Record<Key, string> = {
  id: 'id',
  address: 'Address',
  code: 'Code',
  name: 'Name',
  balance: 'Balance',
  actions: 'actions',
};

@Component({
  selector: 'app-manage-wallets',
  templateUrl: './manage-wallets.component.html',
  styleUrls: ['./manage-wallets.component.scss'],
})
export class ManageWalletsComponent extends BaseComponent {
  protected readonly transactUrl = webRoutesConfig.transact;
  protected readonly title = 'Wallets';

  protected readonly subtitle = 'Your latest wallet balances.';
  protected readonly columns: Key[] = ['address', 'code', 'name', 'balance', 'actions'];
  protected readonly keys = KEYS;
  protected search = '';
  protected readonly pagination$ = new BehaviorSubject<Pagination>({
    page: 0,
    size: 5,
  });

  protected loading$ = this._loadingService.loading$;
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

  public constructor(
    private readonly _router: Router,
    private readonly _loadingService: LoadingService,
    private readonly _walletService: WalletService
  ) {
    super();
  }

  public async onWithdraw(currencyCode: string): Promise<void> {
    const url = `${this.transactUrl}/${currencyCode}`;
    await this._router.navigate([url], {
      queryParams: {
        action: 'WITHDRAW',
        currencyCode: currencyCode,
      },
    });
  }

  public async onDeposit(currencyCode: string): Promise<void> {
    const url = `${this.transactUrl}/${currencyCode}`;
    await this._router.navigate([url], {
      queryParams: {
        action: 'DEPOSIT',
        currencyCode: currencyCode,
      },
    });
  }

  public isMatch(value: unknown): boolean {
    return !!this.search && TUI_DEFAULT_MATCHER(value, this.search);
  }

  public onPagination(pagination: Pagination): void {
    this.pagination$.next(pagination);
  }
}
