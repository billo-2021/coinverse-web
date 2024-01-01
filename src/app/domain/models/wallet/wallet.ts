import { CryptoCurrency } from '../lookup';

export interface Wallet {
  readonly id: number;
  readonly address: string;
  readonly currency: CryptoCurrency;
  readonly balance: number;
}
