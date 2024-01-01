export interface CryptoCurrencyDto {
  readonly id: number;
  readonly code: string;
  readonly name: string;
  readonly symbol: string;
  readonly circulatingSupply: number;
}
