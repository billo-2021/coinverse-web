import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { BaseComponent, webRoutesConfig } from '../../../../common';

type Tab = {
  text: string;
  icon: string;
  isDisabled: boolean;
};

enum Tabs {
  CryptoCurrencies,
  FiatCurrencies,
}

@Component({
  selector: 'app-manage-currencies',
  templateUrl: './manage-currencies.component.html',
  styleUrls: ['./manage-currencies.component.scss'],
})
export class ManageCurrenciesComponent extends BaseComponent {
  protected readonly manageCurrenciesUrl = webRoutesConfig.manageCurrencies;
  protected readonly newCurrencyUrl = webRoutesConfig.newCurrency;
  protected readonly title = 'Manage Currencies';
  protected readonly tabs: Tab[] = [
    { text: 'Crypto', icon: 'tuiIconKey', isDisabled: false },
    { text: 'Fiat', icon: 'tuiIconDollarSign', isDisabled: false },
  ];
  protected readonly TABS = Tabs;
  protected activeTabIndex = 0;

  protected readonly subtitle = 'Manage currencies here.';

  public constructor(private readonly _router: Router) {
    super();
  }

  public async onEditCurrency(currencyCode: string): Promise<void> {
    const url = `${this.manageCurrenciesUrl}/${currencyCode}`;
    await this._router.navigate([url]);
  }

  public async onNewCurrency(): Promise<void> {
    await this._router.navigate([this.newCurrencyUrl]);
  }
}
