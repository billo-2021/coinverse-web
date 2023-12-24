import { WalletResponse } from '../../../common/domain-models/wallet';

export type WalletModel = {
  readonly wallets: WalletResponse[];
  readonly walletCurrencyNames: string[];
  readonly walletCurrencySymbols: string[];
  readonly walletBalances: number[];
  readonly totalBalance: number;
};
