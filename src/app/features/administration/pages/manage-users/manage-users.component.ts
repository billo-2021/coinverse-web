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
  ReplaySubject,
  shareReplay,
  startWith,
  switchMap,
} from 'rxjs';
import {
  AlertService,
  ErrorUtils,
  HttpMessage,
  NavigationController,
  Page,
  PageResponse,
  WebRoute,
} from '../../../../shared';
import { PAGE_OPTIONS, Pagination, PAGINATION_TOKEN } from '../../../../ui-components';
import { AdministrationService, AdminUser } from '../../../../domain';

interface ManageUsersViewModel {
  readonly usersPagination: Pagination;
  readonly userPage: PageResponse<AdminUser>;
}

@Component({
  selector: 'app-manage-users',
  templateUrl: './manage-users.component.html',
  styleUrls: ['./manage-users.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ManageUsersComponent implements Page {
  public readonly title = 'Manage Users';
  public readonly subtitle = 'Manage users here.';

  @HostBinding('class') private _classes = 'block';

  private readonly _reload$ = new ReplaySubject<void>();
  private readonly _usersPagination$ = new BehaviorSubject<Pagination>(this._pagination);

  private readonly _userPage$ = combineLatest([this._reload$, this._usersPagination$]).pipe(
    switchMap(({ 1: query }) => this._administrationService.getUsers(query).pipe(shareReplay(1))),
    startWith<PageResponse<AdminUser>>(PAGE_OPTIONS)
  );

  public readonly viewModel$: Observable<ManageUsersViewModel> = combineLatest([
    this._usersPagination$,
    this._userPage$,
  ]).pipe(map(([usersPagination, userPage]) => ({ usersPagination, userPage })));

  public constructor(
    @Inject(PAGINATION_TOKEN) private readonly _pagination: Pagination,
    private readonly _navigationService: NavigationController,
    private readonly _alertService: AlertService,
    private readonly _administrationService: AdministrationService
  ) {
    this._reload$.next();
  }

  public set usersPagination(pagination: Pagination) {
    this._usersPagination$.next(pagination);
  }

  public reload(): void {
    this._reload$.next();
  }

  public onViewUserDetails(username: string): void {
    this._navigationService.to({ route: WebRoute.MANAGE_USERS, routePath: username }).then();
  }

  public onAddUser(): void {
    this._navigationService.to(WebRoute.NEW_USER).then();
  }

  public onPagination(pagination: Pagination): void {
    this.usersPagination = pagination;
  }

  public onDisableAccount(username: string): void {
    this._administrationService.disableAccount(username).subscribe(this.showMessage());
  }

  public onEnableAccount(username: string): void {
    this._administrationService.enableAccount(username).subscribe(this.showMessage());
  }

  public showMessage() {
    return {
      next: (response: HttpMessage) => {
        this._alertService.showMessage(response.message);
        this.reload();
      },
      error: (error: unknown) => {
        this._alertService.showErrorMessage(ErrorUtils.getErrorMessage(error));
      },
    };
  }
}
