import { AdminUserAddress } from './admin-user-address';
import { AdminUserAccount } from './admin-user-account';

export interface AdminUser {
  readonly emailAddress: string;
  readonly firstName: string;
  readonly lastName: string;
  readonly phoneNumber: string;
  readonly account: AdminUserAccount;
  readonly address: AdminUserAddress;
  readonly createdAt: Date;
  readonly updateAt: Date;
}
