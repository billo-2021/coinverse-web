import { AdminUserAddressDto } from './admin-user-address-dto';
import { AdminUserAccountDto } from './admin-user-account-dto';

export interface AdminUserDto {
  readonly emailAddress: string;
  readonly firstName: string;
  readonly lastName: string;
  readonly phoneNumber: string;
  readonly account: AdminUserAccountDto;
  readonly address: AdminUserAddressDto;
  readonly createdAt: Date;
  readonly updateAt: Date;
}
