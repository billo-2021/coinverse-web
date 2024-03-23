import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  HostBinding,
  Inject,
  Input,
  Output,
  ViewEncapsulation,
} from '@angular/core';
import { Pagination, PAGINATION_TOKEN, TOTAL_ITEMS } from '../../../../ui-components';
import { AdminUser } from '../../../../domain';

export const KEYS = {
  emailAddress: 'Email Address',
  firstName: 'First Name',
  lastName: 'Last Name',
  username: 'Username',
  roles: 'Roles',
  status: 'Status',
  createdAt: 'Created At',
  actions: 'Actions',
} as const;

export type ColumnsType = (keyof typeof KEYS)[];
export type KeysType = typeof KEYS;

export interface UsersComponentInput {
  pagination: Pagination;
  users: readonly AdminUser[];
  total: number;
}

export interface UsersComponentOutput {
  paginationChanged: EventEmitter<Pagination>;
  viewUserDetailsClicked: EventEmitter<string>;
  enableAccountClicked: EventEmitter<string>;
  disableAccountClicked: EventEmitter<string>;
}

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UsersComponent implements UsersComponentInput, UsersComponentOutput {
  @Input() public pagination: Pagination = this._pagination;
  @Input() public users: readonly AdminUser[] = [];
  @Input() public total: number = TOTAL_ITEMS;

  @Output() public paginationChanged = new EventEmitter<Pagination>();
  @Output() public viewUserDetailsClicked = new EventEmitter<string>();

  @Output() public enableAccountClicked = new EventEmitter<string>();
  @Output() public disableAccountClicked = new EventEmitter<string>();

  public readonly Columns: ColumnsType = Object.keys(KEYS) as ColumnsType;
  public readonly Keys: KeysType = KEYS;

  @HostBinding('class') private _classes = 'block';

  public constructor(@Inject(PAGINATION_TOKEN) private readonly _pagination: Pagination) {}

  public onViewUserDetails(username: string): void {
    this.viewUserDetailsClicked.emit(username);
  }

  public onEnableAccount(username: string): void {
    this.enableAccountClicked.emit(username);
  }

  public onDisableAccount(username: string): void {
    this.disableAccountClicked.emit(username);
  }

  public onPagination(pagination: Pagination): void {
    this.paginationChanged.emit(pagination);
  }
}
