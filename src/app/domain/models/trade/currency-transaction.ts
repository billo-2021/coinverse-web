import { Wallet } from '../wallet';

export interface CurrencyTransaction {
  readonly id: number;
  readonly amount: number;
  readonly currency: string;
  readonly action: string;
  readonly sourceWallet: Wallet;
  readonly destinationWallet: Wallet;
  readonly status: string;
  readonly createdAt: Date;
}
