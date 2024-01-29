import { Wallet } from '../../../domain';

export type WalletModel = {
  readonly wallets: readonly Wallet[];
  readonly walletCurrencyNames: readonly string[];
  readonly walletCurrencySymbols: readonly string[];
  readonly walletBalances: readonly number[];
  readonly totalBalance: number;
};
