import { AccountEventDto } from './account-event-dto';

export interface UserAccountEventDto {
  readonly event: AccountEventDto;
  readonly deviceDetails: string;
  readonly ipAddress: string;
  readonly createdAt: Date;
}
