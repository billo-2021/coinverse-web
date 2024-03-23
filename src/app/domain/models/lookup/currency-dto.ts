import { CountryDto } from './country-dto';

export interface CurrencyDto {
  readonly id: number;
  readonly type: string;
  readonly code: string;
  readonly name: string;
  readonly symbol: string;
  readonly countries: readonly CountryDto[];
}
