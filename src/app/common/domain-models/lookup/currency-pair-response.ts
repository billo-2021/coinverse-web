import {CurrencyResponse} from "./currency-response";

export interface CurrencyPairResponse {
  id: number;
  type: string;
  name: string;
  baseCurrency: CurrencyResponse;
  quoteCurrency: CurrencyResponse;
}
