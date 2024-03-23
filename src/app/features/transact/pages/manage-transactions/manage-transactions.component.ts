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
import { NavigationController, Page, PageResponse, WebRoute } from '../../../../shared';
import { PAGE_OPTIONS, Pagination, PAGINATION_TOKEN } from '../../../../ui-components';
import { Payment, TransactService } from '../../../../domain';

export interface ManageTransactionsViewModel {
  readonly paymentsPagination: Pagination;
  readonly paymentsPage: PageResponse<Payment>;
}

@Component({
  selector: 'app-manage-transactions',
  templateUrl: './manage-transactions.component.html',
  styleUrls: ['./manage-transactions.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ManageTransactionsComponent implements Page {
  public readonly title = 'Transaction History';
  public readonly subtitle = 'Your transaction history.';
  @HostBinding('class') private _classes = 'block';
  private readonly _paymentsPagination$ = new BehaviorSubject<Pagination>(this._paginationToken);

  protected readonly paymentsPage$: Observable<PageResponse<Payment>> = combineLatest([
    this._paymentsPagination$,
  ]).pipe(
    switchMap((query) => this._transactService.getTransactions(...query).pipe(shareReplay(1))),
    startWith<PageResponse<Payment>>(PAGE_OPTIONS)
  );

  protected readonly viewModel$: Observable<ManageTransactionsViewModel> = combineLatest([
    this._paymentsPagination$,
    this.paymentsPage$,
  ]).pipe(map(([paymentsPagination, paymentsPage]) => ({ paymentsPagination, paymentsPage })));

  public constructor(
    @Inject(PAGINATION_TOKEN) private readonly _paginationToken: Pagination,
    private readonly _navigationService: NavigationController,
    private readonly _transactService: TransactService
  ) {}

  protected set paymentsPagination(value: Pagination) {
    this._paymentsPagination$.next(value);
  }

  public onWithdraw(): void {
    this._navigationService
      .to({ route: WebRoute.TRANSACT, queryParams: { action: 'withdraw' } })
      .then();
  }

  public onDeposit(): void {
    this._navigationService
      .to({ route: WebRoute.TRANSACT, queryParams: { action: 'deposit' } })
      .then();
  }

  public onPagination(pagination: Pagination): void {
    this.paymentsPagination = pagination;
  }
}
