import { CurrencyTransactionResponse } from '../../../../common/domain-models/trade';

import { TradeModel } from '../../models';

export enum TradeTabs {
  BUY,
  SELL,
}

export enum TradeSteps {
  TRADE_REQUEST,
  TRADE_QUOTE,
  TRADE_CONFIRMATION,
}

export interface TradeViewModel {
  readonly activeTabIndex: TradeTabs;
  readonly currentStepIndex: TradeSteps;
  readonly currencyPairName: string | null;
  readonly tradeModel: TradeModel | null;
  readonly tradeResponse: CurrencyTransactionResponse | null;
}
