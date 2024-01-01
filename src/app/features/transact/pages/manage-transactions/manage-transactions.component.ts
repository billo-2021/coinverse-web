import { Component, Self } from '@angular/core';

import { Pagination } from '../../../../ui-components';
import { NavigationService } from '../../../../common';

import { ManageTransactionsViewModelService } from '../../services';

const KEYS = {
  id: 'Id',
  amount: 'Amount',
  method: 'Method',
  action: 'Action',
  status: 'Status',
  createdAt: 'Created At',
} as const;

@Component({
  selector: 'app-manage-transactions',
  templateUrl: './manage-transactions.component.html',
  styleUrls: ['./manage-transactions.component.scss'],
  providers: [ManageTransactionsViewModelService],
})
export class ManageTransactionsComponent {
  protected readonly viewModel$: ManageTransactionsViewModelService;
  protected readonly title = 'Transaction History';
  protected readonly subtitle = 'Your transaction history.';

  protected readonly columns = Object.keys(KEYS) as Array<keyof typeof KEYS>;
  protected readonly keys = KEYS;

  public constructor(
    private readonly _navigationService: NavigationService,
    @Self() private readonly _viewModel$: ManageTransactionsViewModelService
  ) {
    this.viewModel$ = _viewModel$;
  }

  public onWithdraw(): void {
    this._navigationService.to('transact').then();
  }

  public onDeposit(): void {
    this._navigationService.to('transact').then();
  }

  public onPagination(pagination: Pagination): void {
    this.viewModel$.pagination = pagination;
  }
}
