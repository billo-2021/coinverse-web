import { ListOption } from '../../../../form-components';
import { CurrencyPairResponse, CurrencyResponse } from '../../../../common/domain-models/lookup';

export interface TradeFormViewModel {
  readonly currencyPairOptions: readonly ListOption<CurrencyPairResponse>[];
  readonly currencyOptions: readonly ListOption<CurrencyResponse>[];
  readonly filteredCurrencyOptions: readonly ListOption<CurrencyResponse>[];
}
