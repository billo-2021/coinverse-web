export interface PaymentModel {
  readonly paymentMethod: string;
  readonly amountCurrency: string;
  readonly fromCurrency: string;
  readonly toCurrency: string;
  readonly amount: number;
}
