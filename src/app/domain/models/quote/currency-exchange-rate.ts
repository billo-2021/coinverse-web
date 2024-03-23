import { CurrencyQuote } from './currency-quote';

export interface CurrencyExchangeRate {
  readonly currencyPairName: string;
  readonly currencyPairType: string;
  readonly quotes: readonly CurrencyQuote[];
}
