import { FormControl } from '@angular/forms';

import { ListOption } from '../../../form-components';
import { CurrencyPairResponse, CurrencyResponse } from '../../../common/domain-models/lookup';

export interface TradeForm {
  readonly currencyPair: FormControl<ListOption<CurrencyPairResponse> | null>;
  readonly amountCurrency: FormControl<ListOption<CurrencyResponse> | null>;
  readonly amount: FormControl<number>;
}
