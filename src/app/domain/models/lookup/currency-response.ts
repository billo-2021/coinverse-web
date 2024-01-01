import { Country } from './country';

interface CurrencyResponse {
  id: number;
  type: string;
  code: string;
  name: string;
  symbol: string;
  countries: Country[];
}

export { CurrencyResponse };
