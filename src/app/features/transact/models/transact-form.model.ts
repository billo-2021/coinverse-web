import { FormControl } from '@angular/forms';

import { ListOption } from '../../../form-components';
import { WalletResponse } from '../../../common/domain-models/wallet';
import { CurrencyResponse, PaymentMethodResponse } from '../../../common/domain-models/lookup';

export interface TransactForm {
  readonly paymentMethod: FormControl<ListOption<PaymentMethodResponse> | null>;
  readonly wallet: FormControl<ListOption<WalletResponse> | null>;
  readonly amountCurrency: FormControl<ListOption<CurrencyResponse> | null>;
  readonly amount: FormControl<number>;
}
