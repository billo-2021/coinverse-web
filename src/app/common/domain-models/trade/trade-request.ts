export interface TradeRequest {
  readonly amount: number;
  readonly amountCurrencyCode: string;
  readonly quoteId: number;
  readonly action: string;
}
