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
import { Pagination, paginationToken, TOTAL_ITEMS } from '../../../../ui-components';
import { Payment } from '../../../../domain';

export const KEYS = {
  id: 'Id',
  amount: 'Amount',
  method: 'Method',
  action: 'Action',
  status: 'Status',
  createdAt: 'Created At',
} as const;

export type ColumnsType = (keyof typeof KEYS)[];
export type KeysType = typeof KEYS;

export interface TransactionsComponentInput {
  pagination: Pagination;
  payments: readonly Payment[];
  total: number;
}

export interface TransactionsComponentOutput {
  paginationChanged: EventEmitter<Pagination>;
}

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TransactionsComponent
  implements TransactionsComponentInput, TransactionsComponentOutput
{
  @Input() public pagination: Pagination = this._paginationToken;
  @Input() public payments: readonly Payment[] = [];
  @Input() public total: number = TOTAL_ITEMS;

  @Output() public paginationChanged = new EventEmitter<Pagination>();

  protected readonly Keys: KeysType = KEYS;
  protected readonly Columns: ColumnsType = Object.keys(KEYS) as ColumnsType;

  @HostBinding('class') private _classes = 'block';

  public constructor(@Inject(paginationToken) private readonly _paginationToken: Pagination) {}

  public onPagination(page: Pagination): void {
    this.paginationChanged.next(page);
  }
}
