export interface CryptoCurrencyRequest {
  readonly code: string;
  readonly name: string;
  readonly symbol: string;
  readonly circulatingSupply: number;
}
