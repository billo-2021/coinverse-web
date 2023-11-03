interface CurrencyExchangeResponseData {
  readonly id: number;
  readonly bidRate: number;
  readonly askRate: number;
  readonly timeToLive: number;
  readonly createdAt: Date;
}

interface CurrencyExchangeRateResponse {
  readonly currencyPairName: string;
  readonly currencyPairType: string;
  data: readonly CurrencyExchangeResponseData[];
}

export {CurrencyExchangeResponseData, CurrencyExchangeRateResponse}
