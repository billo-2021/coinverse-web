import {CurrencyDto} from "./currency-dto.model";

export interface CurrencyPairDto {
  id: number;
  type: string;
  name: string;
  baseCurrency: CurrencyDto;
  quoteCurrency: CurrencyDto;
}
