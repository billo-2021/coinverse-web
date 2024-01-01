export interface PaymentRequest {
  readonly amount: number;
  readonly amountCurrencyCode: string;
  readonly fromCurrencyCode: string;
  readonly toCurrencyCode: string;
  readonly paymentMethod: string;
}
