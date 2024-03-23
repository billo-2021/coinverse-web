import { CurrencyDto } from './currency-dto';

export interface CurrencyPairDto {
  readonly id: number;
  readonly type: string;
  readonly name: string;
  readonly baseCurrency: CurrencyDto;
  readonly quoteCurrency: CurrencyDto;
}
