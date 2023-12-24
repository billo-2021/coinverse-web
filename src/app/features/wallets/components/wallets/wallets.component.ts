import { Component, EventEmitter, HostBinding, Inject, Input, Output } from '@angular/core';

import { Pagination, paginationToken } from '../../../../ui-components';

import { WalletResponse } from '../../../../common/domain-models/wallet';

const KEYS = {
  id: 'Id',
  address: 'Address',
  code: 'Code',
  name: 'Name',
  balance: 'Balance',
  actions: '',
} as const;

@Component({
  selector: 'app-wallets',
  templateUrl: './wallets.component.html',
  styleUrls: ['./wallets.component.scss'],
})
export class WalletsComponent {
  @Input() public pagination: Pagination = this._paginationToken;
  @Input() public wallets: readonly WalletResponse[] = [];
  @Input() public total = 1;

  @Output() public readonly paginationChanged = new EventEmitter<Pagination>();
  @Output() public readonly depositClicked = new EventEmitter<string>();
  @Output() public readonly withdrawClicked = new EventEmitter<string>();
  protected readonly title = 'Wallets';
  protected readonly subtitle = 'Your latest wallet balances.';
  protected readonly columns = Object.keys(KEYS) as Array<keyof typeof KEYS>;
  protected readonly keys = KEYS;
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
