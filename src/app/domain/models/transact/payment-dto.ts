import { CurrencyExchangeRateDto } from '../quote';

export interface PaymentDto {
  id: number;
  amount: number;
  currency: string;
  exchangeRate: CurrencyExchangeRateDto;
  method: string;
  action: string;
  status: string;
  createdAt: Date;
}
