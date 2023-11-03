import {CryptoCurrencyDto} from "../lookup";

export interface WalletDto {
  readonly id: number;
  readonly address: string;
  readonly currency: CryptoCurrencyDto;
  readonly balance: number;
}
