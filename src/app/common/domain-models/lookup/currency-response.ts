import {CountryResponse} from "./country-response";

interface CurrencyResponse {
  id: number;
  type: string;
  code: string;
  name: string;
  symbol: string;
  countries: CountryResponse[];
}

export {CurrencyResponse};
