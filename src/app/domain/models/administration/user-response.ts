import { UserAddressResponse } from './user-address-response';
import { UserAccountResponse } from './user-account-response';

export interface UserResponse {
  readonly emailAddress: string;
  readonly firstName: string;
  readonly lastName: string;
  readonly phoneNumber: string;
  readonly account: UserAccountResponse;
  readonly address: UserAddressResponse;
  readonly createdAt: Date;
  readonly updateAt: Date;
}
