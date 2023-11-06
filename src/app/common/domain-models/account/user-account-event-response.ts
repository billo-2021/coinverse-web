import { AccountEventResponse } from './account-event-response';

export interface UserAccountEventResponse {
  readonly event: AccountEventResponse;
  readonly deviceDetails: string;
  readonly ipAddress: string;
  readonly createdAt: Date;
}
