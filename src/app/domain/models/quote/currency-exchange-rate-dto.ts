import { CurrencyExchangeRateDataDto } from './currency-exchange-rate-data-dto';

export interface CurrencyExchangeRateDto {
  readonly currencyPairName: string;
  readonly currencyPairType: string;
  readonly data: readonly CurrencyExchangeRateDataDto[];
}
