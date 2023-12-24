import { WalletResponse } from '../../../../common/domain-models/wallet';
import { CurrencyResponse, PaymentMethodResponse } from '../../../../common/domain-models/lookup';

import { ListOption } from '../../../../form-components';

export interface TransactFormViewModel {
  readonly paymentMethodOptions: readonly ListOption<PaymentMethodResponse>[];
  readonly currencyOptions: readonly ListOption<CurrencyResponse>[];
  readonly walletOptions: readonly ListOption<WalletResponse>[];
  readonly selectedWallet: ListOption<WalletResponse> | null;
}
