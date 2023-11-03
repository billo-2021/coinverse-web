import {Component, Inject} from '@angular/core';
import {webRoutesConfig} from "../../../../common/config/web-routes-config";
import {BehaviorSubject, combineLatest, filter, map, Observable, shareReplay, startWith, switchMap} from "rxjs";
import {Router} from "@angular/router";
import {TUI_DEFAULT_MATCHER, tuiIsPresent} from "@taiga-ui/cdk";
import {BaseComponent} from "../../../../common/components";
import {PaymentResponse} from "../../../../common/domain-models/transact/payment-response";
import {TransactService} from "../../../../common/domain-services";
import {LoadingService} from "../../../../core/services/loading/loading.service";

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
  createdAt: 'Created At'
};

@Component({
  selector: 'app-manage-transactions',
  templateUrl: './manage-transactions.component.html',
  styleUrls: ['./manage-transactions.component.scss']
})
export class ManageTransactionsComponent extends BaseComponent {
  protected readonly transactUrl = webRoutesConfig.transact.root;
  protected readonly title = 'Transaction History';

  protected readonly subtitle = 'Your transaction history.';
  protected readonly columns: Key[] = ['id', 'amount', 'method', 'action', 'status', 'createdAt'];
  protected readonly keys = KEYS;
  protected search = '';

  protected readonly pagination$ = new BehaviorSubject<Pagination>({page: 0, size: 5});
  protected readonly request$ = combineLatest([this.pagination$])
    .pipe(switchMap(query =>
        this.transactService.getTransactions(...query)
          .pipe(startWith(null))),
      shareReplay(1));

  protected payments$: Observable<readonly PaymentResponse[]> = this.request$.pipe(
    filter(tuiIsPresent),
    map(paymentPage => paymentPage.data),
    startWith([])
  );

  protected total$: Observable<number> = this.request$
    .pipe(filter(tuiIsPresent),
      map(paymentPage => paymentPage.total),
      startWith(1));

  protected readonly loading$ = this.loadingService.loading$;

  public constructor(@Inject(Router) private readonly router: Router,
                     @Inject(LoadingService) private readonly loadingService: LoadingService,
                     @Inject(TransactService) private readonly transactService: TransactService) {
    super();
  }

  public async onWithdraw(): Promise<void> {
    await this.router.navigate([this.transactUrl]);
  }

  public async onDeposit(): Promise<void> {
    await this.router.navigate([this.transactUrl]);
  }

  public isMatch(value: unknown): boolean {
    return !!this.search && TUI_DEFAULT_MATCHER(value, this.search);
  }

  public onPagination(pagination: Pagination): void {
    this.pagination$.next(pagination);
  }
}
