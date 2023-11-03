interface CurrencyExchangeRateDtoData {
  readonly id: number;
  readonly bidRate: number;
  readonly askRate: number;
  readonly timeToLive: number;
  readonly createdAt: Date;
}

interface CurrencyExchangeRateDto {
  readonly currencyPairName: string;
  readonly currencyPairType: string;
  data: readonly CurrencyExchangeRateDtoData[];
}

export {CurrencyExchangeRateDtoData, CurrencyExchangeRateDto};
