import { ChangeDetectionStrategy, Component } from '@angular/core';
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
import { LoadingService } from '../../../../core/services/loading/loading.service';
import { BaseComponent } from '../../../../common/components';
import { UserAccountService } from '../../../../common/domain-services';
import { UserAccountEventResponse } from '../../../../common/domain-models';
import { AlertService } from '../../../../core/services';

type Pagination = {
  readonly page: number;
  readonly size: number;
};

type Key = 'device' | 'ipAddress' | 'type' | 'description' | 'actions' | 'date';

const KEYS: Record<Key, string> = {
  device: 'Device Details',
  ipAddress: 'IP Address',
  type: 'Type',
  description: 'Description',
  date: 'Date',
  actions: 'Actions',
};

@Component({
  selector: 'app-account-activity',
  templateUrl: './account-activity.component.html',
  styleUrls: ['./account-activity.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AccountActivityComponent extends BaseComponent {
  protected readonly title = 'Account Activities';
  protected readonly subtitle = 'Latest activities in your account';
  protected columns: Key[] = ['device', 'ipAddress', 'type', 'description', 'date', 'actions'];
  protected keys = KEYS;
  protected search = '';

  protected readonly pagination$ = new BehaviorSubject<Pagination>({
    page: 0,
    size: 5,
  });

  protected readonly request$ = combineLatest([this.pagination$]).pipe(
    switchMap((query) => this.userAccountService.getUserAccountEvents(...query).pipe(startWith(null))),
    shareReplay(1)
  );

  protected readonly userAccountEvents$: Observable<readonly UserAccountEventResponse[]> = this.request$.pipe(
    filter(tuiIsPresent),
    map((userAccountEventPage) => userAccountEventPage.data),
    startWith([])
  );

  protected total$: Observable<number> = this.request$.pipe(
    filter(tuiIsPresent),
    map((paymentPage) => paymentPage.total),
    startWith(1)
  );

  protected readonly loading$: Observable<boolean> = this.loadingService.loading$;

  public constructor(
    private readonly loadingService: LoadingService,
    private readonly alertService: AlertService,
    private readonly userAccountService: UserAccountService
  ) {
    super();
  }

  public onPagination(pagination: Pagination): void {
    this.pagination$.next(pagination);
  }

  public isMatch(value: unknown): boolean {
    return !!this.search && TUI_DEFAULT_MATCHER(value, this.search);
  }

  public onReportActivity(): void {
    this.alertService.showMessage('Activity reported');
  }
}
