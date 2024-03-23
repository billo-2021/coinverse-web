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
import { CurrencyTransaction } from '../../../../domain';

export const KEYS = {
  id: 'id',
  amount: 'Amount',
  sourceWallet: 'Source Wallet',
  destinationWallet: 'Destination Wallet',
  action: 'Action',
  status: 'Status',
  createdAt: 'Created At',
} as const;

export type ColumnsType = (keyof typeof KEYS)[];
export type KeysType = typeof KEYS;

export interface TradesComponentInput {
  pagination: Pagination;
  trades: readonly CurrencyTransaction[];
  total: number;
}

export interface TradesComponentOutput {
  paginationChanged: EventEmitter<Pagination>;
}

@Component({
  selector: 'app-trades',
  templateUrl: './trades.component.html',
  styleUrls: ['./trades.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TradesComponent implements TradesComponentInput, TradesComponentOutput {
  @Input() public pagination: Pagination = this._pagination;
  @Input() public trades: readonly CurrencyTransaction[] = [];
  @Input() public total: number = TOTAL_ITEMS;

  @Output() public paginationChanged = new EventEmitter<Pagination>();

  public readonly Columns: ColumnsType = Object.keys(KEYS) as ColumnsType;
  public readonly Keys: KeysType = KEYS;

  @HostBinding('class') private _classes = 'block';

  public constructor(@Inject(PAGINATION_TOKEN) private readonly _pagination: Pagination) {}

  protected onPagination(value: Pagination): void {
    this.paginationChanged.emit(value);
  }
}
