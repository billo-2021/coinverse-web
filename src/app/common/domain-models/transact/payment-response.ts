import { CurrencyExchangeRateResponse } from '../quote';

export interface PaymentResponse {
  id: number;
  amount: number;
  currency: string;
  exchangeRate: CurrencyExchangeRateResponse;
  method: string;
  action: string;
  status: string;
  createdAt: Date;
}
