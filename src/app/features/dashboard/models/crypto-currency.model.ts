import { CryptoCurrency } from '../../../domain';

export type CryptoCurrencyModel = CryptoCurrency & {
  readonly askRate: number;
  readonly bidRate: number;
  readonly change: number;
};
