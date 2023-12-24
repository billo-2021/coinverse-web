import { PaymentResponse } from '../../../../common/domain-models/transact';

import { PaymentModel } from '../../models';

export enum Tabs {
  DEPOSIT,
  WITHDRAW,
}

export enum TransactSteps {
  TRANSACT_REQUEST,
  BANK_DETAILS,
  TRANSACT_CONFIRMATION,
}

export interface TransactViewModel {
  readonly activeTabIndex: Tabs;
  readonly currentStepIndex: TransactSteps;
  readonly currencyCode: string | null;
  readonly paymentModel: PaymentModel | null;
  readonly paymentResponse: PaymentResponse | null;
}
