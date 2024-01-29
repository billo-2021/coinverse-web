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
import { NavigationService } from '../../../../common';
import { PAGE_OPTIONS, Pagination, paginationToken } from '../../../../ui-components';
import { Wallet, WalletService } from '../../../../domain';

export interface ManageWalletsViewModel {
  readonly walletsPagination: Pagination;
  readonly walletPage: PageResponse<Wallet>;
}

@Component({
  selector: 'app-manage-wallets',
  templateUrl: './manage-wallets.component.html',
  styleUrls: ['./manage-wallets.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ManageWalletsComponent {
  protected readonly _walletsPagination$ = new BehaviorSubject<Pagination>(this._paginationToken);
  protected walletPage$: Observable<PageResponse<Wallet>> = combineLatest([
    this._walletsPagination$,
  ]).pipe(
    switchMap((query) => this._walletService.getBalances(...query).pipe(shareReplay(1))),
    startWith(PAGE_OPTIONS)
  );
  protected readonly viewModel$: Observable<ManageWalletsViewModel> = combineLatest([
    this._walletsPagination$,
    this.walletPage$,
  ]).pipe(map(([walletsPagination, walletPage]) => ({ walletsPagination, walletPage })));
  @HostBinding('class') private _classes = 'block';

  public constructor(
    @Inject(paginationToken) private readonly _paginationToken: Pagination,
    private readonly _navigationService: NavigationService,
    private readonly _walletService: WalletService
  ) {}

  public set walletsPagination(value: Pagination) {
    this._walletsPagination$.next(value);
  }

  public onWithdraw(currencyCode: string): void {
    this._navigationService
      .to({
        route: 'transact',
        queryParams: { action: 'withdraw', currencyCode: currencyCode },
      })
      .then();
  }

  public onDeposit(currencyCode: string): void {
    this._navigationService
      .to({
        route: 'transact',
        queryParams: { action: 'deposit', currencyCode: currencyCode },
      })
      .then();
  }

  public onPagination(pagination: Pagination): void {
    this.walletsPagination = pagination;
  }
}
