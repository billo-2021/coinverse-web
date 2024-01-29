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
import { Wallet } from '../../../../domain';

export const KEYS = {
  id: 'Id',
  address: 'Address',
  code: 'Code',
  name: 'Name',
  balance: 'Balance',
  actions: '',
} as const;

export type ColumnsType = (keyof typeof KEYS)[];
export type KeysType = typeof KEYS;

export interface WalletsComponentInput {
  pagination: Pagination;
  wallets: readonly Wallet[];
  total: number;
}

export interface WalletsComponentOutput {
  paginationChanged: EventEmitter<Pagination>;
  depositClicked: EventEmitter<string>;
  withdrawClicked: EventEmitter<string>;
}

@Component({
  selector: 'app-wallets',
  templateUrl: './wallets.component.html',
  styleUrls: ['./wallets.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WalletsComponent implements WalletsComponentInput, WalletsComponentOutput {
  @Input() public pagination: Pagination = this._paginationToken;
  @Input() public wallets: readonly Wallet[] = [];
  @Input() public total: number = TOTAL_ITEMS;

  @Output() public paginationChanged = new EventEmitter<Pagination>();
  @Output() public depositClicked = new EventEmitter<string>();
  @Output() public withdrawClicked = new EventEmitter<string>();

  protected readonly title = 'Wallets';
  protected readonly subtitle = 'Your latest wallet balances.';
  protected readonly Columns: ColumnsType = Object.keys(KEYS) as ColumnsType;
  protected readonly Keys: KeysType = KEYS;

  @HostBinding('class') private _classes = 'block';

  public constructor(@Inject(paginationToken) private readonly _paginationToken: Pagination) {}

  public onPagination(pagination: Pagination): void {
    this.paginationChanged.emit(pagination);
  }

  public onDeposit(currencyCode: string): void {
    this.depositClicked.emit(currencyCode);
  }

  public onWithdraw(currencyCode: string): void {
    this.withdrawClicked.emit(currencyCode);
  }
}
