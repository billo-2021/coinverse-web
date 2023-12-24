import { Component, HostBinding } from '@angular/core';
import { Observable } from 'rxjs';

import { NavigationService, webRoutesConfig } from '../../../../common';
import { Pagination } from '../../../../ui-components';

import { DashboardViewModelService } from '../../services';
import { DashboardViewModel } from './dashboard.view-model';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent {
  protected viewModel$: Observable<DashboardViewModel>;
  @HostBinding('class') private _classes = 'block';

  public constructor(
    private readonly _dashboardViewModel$: DashboardViewModelService,
    private readonly _navigationService: NavigationService
  ) {
    this.viewModel$ = _dashboardViewModel$;
  }

  public onCryptoCurrencyPagination(pagination: Pagination) {
    this._dashboardViewModel$.cryptoCurrencyPagination = pagination;
  }

  public onBuy(currencyPairName: string): void {
    const url = webRoutesConfig.trade;
    this._navigationService
      .to({
        route: url,
        queryParams: { action: 'buy', currencyPairName },
      })
      .then();
  }

  public onSell(currencyPairName: string): void {
    const url = webRoutesConfig.trade;
    this._navigationService
      .to({
        route: url,
        queryParams: { action: 'sell', currencyPairName },
      })
      .then();
  }
}
