import { CurrencyExchangeRateDataDto } from './currency-exchange-rate-data-dto.model';

export interface CurrencyExchangeRateDto {
  readonly currencyPairName: string;
  readonly currencyPairType: string;
  readonly data: readonly CurrencyExchangeRateDataDto[];
}
