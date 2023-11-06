import { Component, Inject } from '@angular/core';
import { BaseComponent } from '../../../../common/components';
import {
  BehaviorSubject,
  combineLatest,
  filter,
  map,
  Observable,
  shareReplay,
  startWith,
  switchMap,
  tap,
} from 'rxjs';
import { TUI_DEFAULT_MATCHER, tuiIsPresent } from '@taiga-ui/cdk';
import { Router } from '@angular/router';
import { webRoutesConfig } from '../../../../common/config/web-routes-config';
import { UserResponse } from '../../../../common/domain-models/administration';
import { AdministrationService } from '../../../../common/domain-services';
import { LoadingService } from '../../../../core/services/loading/loading.service';
import { AlertService } from '../../../../core/services';

interface Pagination {
  page: number;
  size: number;
}

type Key =
  | 'emailAddress'
  | 'firstName'
  | 'lastName'
  | 'username'
  | 'roles'
  | 'status'
  | 'createdAt'
  | 'actions';

const KEYS: Record<Key, string> = {
  emailAddress: 'Email Address',
  firstName: 'First Name',
  lastName: 'Last Name',
  username: 'Username',
  roles: 'Roles',
  status: 'Status',
  createdAt: 'Created At',
  actions: 'Actions',
};

@Component({
  selector: 'app-manage-users',
  templateUrl: './manage-users.component.html',
  styleUrls: ['./manage-users.component.scss'],
})
export class ManageUsersComponent extends BaseComponent {
  protected readonly manageUsersUrl = webRoutesConfig.administration.manageUsers;
  protected readonly newUserUrl = webRoutesConfig.administration.newUser;

  protected readonly title = 'Manage Users';

  protected readonly subtitle = 'Manage users here.';
  protected readonly columns: Key[] = [
    'emailAddress',
    'firstName',
    'lastName',
    'username',
    'roles',
    'status',
    'createdAt',
    'actions',
  ];
  protected readonly keys = KEYS;

  protected search = '';

  protected readonly reload$ = new BehaviorSubject(true);
  protected readonly pagination$ = new BehaviorSubject<Pagination>({
    page: 0,
    size: 5,
  });
  protected readonly request$ = combineLatest([this.reload$, this.pagination$]).pipe(
    switchMap((query) => this.administrationService.getUsers(query[1]).pipe(startWith(null))),
    shareReplay(1)
  );

  protected readonly users$: Observable<UserResponse[]> = this.request$.pipe(
    filter(tuiIsPresent),
    map((userPage) => userPage.data),
    startWith([])
  );

  protected total$: Observable<number> = this.request$.pipe(
    filter(tuiIsPresent),
    map((paymentPage) => paymentPage.total),
    startWith(1)
  );

  protected readonly loading$ = this.loadingService.loading$;

  public constructor(
    @Inject(Router) private readonly router: Router,
    @Inject(LoadingService) private readonly loadingService: LoadingService,
    @Inject(AlertService) private readonly alertService: AlertService,
    @Inject(AdministrationService)
    private administrationService: AdministrationService
  ) {
    super();
  }

  public async onViewUserDetails(username: string): Promise<void> {
    const url = `${this.manageUsersUrl}/${username}`;
    await this.router.navigate([url]);
  }

  public async onNewUser(): Promise<void> {
    await this.router.navigate([this.newUserUrl]);
  }

  public isMatch(value: unknown): boolean {
    return !!this.search && TUI_DEFAULT_MATCHER(value, this.search);
  }

  public onPagination(pagination: Pagination): void {
    this.pagination$.next(pagination);
  }

  public onDisableAccount(username: string): void {
    this.administrationService
      .disableAccount(username)
      .pipe(
        tap((response) => {
          this.alertService.showMessage(response.message);
          this.reload$.next(true);
        })
      )
      .subscribe();
  }

  public onEnableAccount(username: string): void {
    this.administrationService
      .enableAccount(username)
      .pipe(
        tap((response) => {
          this.alertService.showMessage(response.message);
          this.reload$.next(true);
        })
      )
      .subscribe();
  }
}
