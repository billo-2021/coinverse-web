import { CryptoCurrencyResponse } from '../../../common/domain-models/lookup';

export type CryptoCurrencyModel = CryptoCurrencyResponse & {
  askRate: number;
  bidRate: number;
  change: number;
};
