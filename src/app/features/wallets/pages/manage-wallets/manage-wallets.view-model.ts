import { Pagination } from '../../../../ui-components';
import { WalletResponse } from '../../../../common/domain-models/wallet';

export interface ManageWalletsViewModel {
  readonly pagination: Pagination;
  readonly wallets: readonly WalletResponse[];
  readonly total: number;
}
