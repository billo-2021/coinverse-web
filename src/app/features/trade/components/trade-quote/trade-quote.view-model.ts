import {
  CurrencyExchangeRateResponse,
  CurrencyExchangeResponseData,
} from '../../../../common/domain-models/quote';

export type ActionType = 'buy' | 'sell';

export interface TradeQuoteViewModel {
  readonly currencyPairName: string | null;
  readonly action: ActionType | null;
  readonly exchangeRate: CurrencyExchangeRateResponse | null;
  readonly exchangeRateData: CurrencyExchangeResponseData | null;
}
