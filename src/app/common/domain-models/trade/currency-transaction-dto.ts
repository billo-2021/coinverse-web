import { WalletDto } from '../wallet';

export interface CurrencyTransactionDto {
  readonly id: number;
  readonly amount: number;
  readonly currency: string;
  readonly action: string;
  readonly sourceWallet: WalletDto;
  readonly destinationWallet: WalletDto;
  readonly status: string;
  readonly createdAt: Date;
}
