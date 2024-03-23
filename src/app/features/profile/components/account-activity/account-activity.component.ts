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
import { Page } from '../../../../shared';
import { Pagination, PAGINATION_TOKEN, TOTAL_ITEMS } from '../../../../ui-components';
import { UserAccountEvent } from '../../../../domain';

export const KEYS = {
  device: 'Device Details',
  ipAddress: 'IP Address',
  type: 'Type',
  description: 'Description',
  date: 'Date',
  actions: 'Actions',
} as const;

export type ColumnsType = (keyof typeof KEYS)[];
export type KeysType = typeof KEYS;

export interface AccountActivityFormComponentInput extends Page {
  pagination: Pagination;
  userAccountEvents: readonly UserAccountEvent[];
  total: number;
}

export interface AccountActivityFormComponentOutput {
  paginationChanged: EventEmitter<Pagination>;
  reportActivityClicked: EventEmitter<UserAccountEvent>;
}

@Component({
  selector: 'app-account-activity',
  templateUrl: './account-activity.component.html',
  styleUrls: ['./account-activity.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AccountActivityComponent
  implements AccountActivityFormComponentInput, AccountActivityFormComponentOutput
{
  @Input() public title = 'Account Activities';
  @Input() public subtitle = 'Latest activities in your account.';
  @Input() public pagination: Pagination = this._pagination;
  @Input() public userAccountEvents: readonly UserAccountEvent[] = [];
  @Input() public total: number = TOTAL_ITEMS;

  @Output() public paginationChanged = new EventEmitter<Pagination>();
  @Output() public reportActivityClicked = new EventEmitter<UserAccountEvent>();

  public readonly Columns: ColumnsType = Object.keys(KEYS) as ColumnsType;
  public readonly Keys: KeysType = KEYS;

  @HostBinding('class') private _classes = 'block';

  public constructor(@Inject(PAGINATION_TOKEN) private readonly _pagination: Pagination) {}

  public paginate(pagination: Pagination): void {
    this.paginationChanged.emit(pagination);
  }

  public reportActivity(userAccountEvent: UserAccountEvent): void {
    this.reportActivityClicked.emit(userAccountEvent);
  }
}
