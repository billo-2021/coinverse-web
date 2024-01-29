export interface CurrencyExchangeRateDataDto {
  readonly id: number;
  readonly bidRate: number;
  readonly askRate: number;
  readonly timeToLive: number;
  readonly createdAt: Date;
}
