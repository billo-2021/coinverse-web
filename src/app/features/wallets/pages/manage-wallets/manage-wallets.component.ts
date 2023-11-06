import { Component, Inject } from '@angular/core';
import { webRoutesConfig } from '../../../../common/config/web-routes-config';
import { BehaviorSubject, combineLatest, filter, map, Observable, startWith, switchMap } from 'rxjs';
import { Router } from '@angular/router';
import { TUI_DEFAULT_MATCHER, tuiIsPresent } from '@taiga-ui/cdk';
import { BaseComponent } from '../../../../common/components';
import { LoadingService } from '../../../../core/services/loading/loading.service';
import { WalletService } from '../../../../common/domain-services';
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
  protected readonly transactUrl = webRoutesConfig.transact.root;
  protected readonly title = 'Wallets';

  protected readonly subtitle = 'Your latest wallet balances.';
  protected readonly columns: Key[] = ['address', 'code', 'name', 'balance', 'actions'];
  protected readonly keys = KEYS;
  protected search = '';
  protected readonly pagination$ = new BehaviorSubject<Pagination>({
    page: 0,
    size: 5,
  });

  protected loading$ = this.loadingService.loading$;
  protected readonly request$ = combineLatest([this.pagination$]).pipe(
    switchMap((query) => this.walletService.getBalances(...query).pipe(startWith(null)))
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
    @Inject(Router) private readonly router: Router,
    @Inject(LoadingService) private readonly loadingService: LoadingService,
    @Inject(WalletService) private readonly walletService: WalletService
  ) {
    super();
  }

  public async onWithdraw(currencyCode: string): Promise<void> {
    const url = `${this.transactUrl}/${currencyCode}`;
    await this.router.navigate([url], {
      queryParams: {
        action: 'WITHDRAW',
        currencyCode: currencyCode,
      },
    });
  }

  public async onDeposit(currencyCode: string): Promise<void> {
    const url = `${this.transactUrl}/${currencyCode}`;
    await this.router.navigate([url], {
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
