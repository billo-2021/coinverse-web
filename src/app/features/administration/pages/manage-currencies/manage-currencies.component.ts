import {Component, Inject} from '@angular/core';
import {BaseComponent} from "../../../../common/components";
import {webRoutesConfig} from "../../../../common/config/web-routes-config";
import {Router} from "@angular/router";


type Tab = {
  text: string;
  icon: string;
  isDisabled: boolean;
};

enum Tabs {
  CryptoCurrencies,
  FiatCurrencies
}

@Component({
  selector: 'app-manage-currencies',
  templateUrl: './manage-currencies.component.html',
  styleUrls: ['./manage-currencies.component.scss']
})
export class ManageCurrenciesComponent extends BaseComponent {
  protected readonly manageCurrenciesUrl = webRoutesConfig.administration.manageCurrencies;
  protected readonly newCurrencyUrl = webRoutesConfig.administration.newCurrency;
  protected readonly title = 'Manage Currencies';
  protected readonly tabs: Tab[] = [
    {text: 'Crypto', icon: 'tuiIconKey', isDisabled: false},
    {text: 'Fiat', icon: 'tuiIconDollarSign', isDisabled: false}
  ];
  protected readonly TABS = Tabs;
  protected activeTabIndex = 0;

  protected readonly subtitle = 'Manage currencies here.';

  public constructor(@Inject(Router) private readonly router: Router) {
    super();
  }

  public async onEditCurrency(currencyCode: string): Promise<void> {
    const url = `${this.manageCurrenciesUrl}/${currencyCode}`;
    await this.router.navigate([url]);
  }

  public async onNewCurrency(): Promise<void> {
    await this.router.navigate([this.newCurrencyUrl]);
  }
}
