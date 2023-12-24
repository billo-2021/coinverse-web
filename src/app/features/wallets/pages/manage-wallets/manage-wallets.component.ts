import { Component } from '@angular/core';

import { Observable } from 'rxjs';

import { Pagination } from '../../../../ui-components';
import { NavigationService, webRoutesConfig } from '../../../../common';

import { ManageWalletsViewModelService } from '../../services';
import { ManageWalletsViewModel } from './manage-wallets.view-model';

@Component({
  selector: 'app-manage-wallets',
  templateUrl: './manage-wallets.component.html',
  styleUrls: ['./manage-wallets.component.scss'],
})
export class ManageWalletsComponent {
  protected viewModel$: Observable<ManageWalletsViewModel>;
  protected readonly transactUrl = webRoutesConfig.transact;

  public constructor(
    private readonly _navigationService: NavigationService,
    private readonly _manageWalletsViewModel: ManageWalletsViewModelService
  ) {
    this.viewModel$ = _manageWalletsViewModel;
  }

  public onWithdraw(currencyCode: string): void {
    const url = this.transactUrl;
    this._navigationService
      .to({
        route: url,
        queryParams: { action: 'withdraw', currencyCode: currencyCode },
      })
      .then();
  }

  public onDeposit(currencyCode: string): void {
    const url = this.transactUrl;
    this._navigationService
      .to({
        route: url,
        queryParams: { action: 'deposit', currencyCode: currencyCode },
      })
      .then();
  }

  public onPagination(pagination: Pagination): void {
    this._manageWalletsViewModel.pagination = pagination;
  }
}
