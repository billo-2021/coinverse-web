import { WalletResponse } from '../wallet';

export interface CurrencyTransactionResponse {
  readonly id: number;
  readonly amount: number;
  readonly currency: string;
  readonly action: string;
  readonly sourceWallet: WalletResponse;
  readonly destinationWallet: WalletResponse;
  readonly status: string;
  readonly createdAt: Date;
}
