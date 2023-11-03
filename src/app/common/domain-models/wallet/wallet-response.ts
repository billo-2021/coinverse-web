import {CryptoCurrencyResponse} from "../lookup";

export interface WalletResponse {
  readonly id: number;
  readonly address: string;
  readonly currency: CryptoCurrencyResponse;
  readonly balance: number;
}
