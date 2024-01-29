import { Currency } from './currency';

export interface CurrencyPair {
  readonly id: number;
  readonly type: string;
  readonly name: string;
  readonly baseCurrency: Currency;
  readonly quoteCurrency: Currency;
}
