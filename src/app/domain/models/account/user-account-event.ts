import { AccountEvent } from './account-event';

export interface UserAccountEvent extends AccountEvent {
  readonly deviceDetails: string;
  readonly ipAddress: string;
  readonly createdAt: Date;
}
