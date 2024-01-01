import { Pagination } from '../../../../ui-components';
import { PaymentResponse } from '../../../../common/domain-models/transact';

export interface ManageTransactionsViewModel {
  readonly pagination: Pagination;
  readonly payments: readonly PaymentResponse[];
  readonly total: number;
}
