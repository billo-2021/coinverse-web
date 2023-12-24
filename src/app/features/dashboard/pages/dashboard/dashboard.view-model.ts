import { WalletResponse } from '../../../../common/domain-models/wallet';
import { Pagination } from '../../../../ui-components';

import { CryptoCurrencyModel } from '../../models';

export interface DashboardViewModel {
  readonly wallets: WalletResponse[];
  readonly walletCurrencyNames: string[];
  readonly walletCurrencySymbols: string[];
  readonly walletBalances: number[];
  readonly totalBalance: number;
  readonly cryptoCurrencyPagination: Pagination;
  readonly cryptoCurrencies: CryptoCurrencyModel[];
  readonly totalCryptoCurrencies: number;
}
