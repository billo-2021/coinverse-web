import { UserAddressRequest } from './user-address-request';
import { UserPreferenceRequest } from './user-preference-request';
import { UserAccountRequest } from './user-account-request';

export interface AddUser {
  readonly firstName: string;
  readonly lastName: string;
  readonly emailAddress: string;
  readonly phoneNumber: string;
  readonly address: UserAddressRequest;
  readonly preference: UserPreferenceRequest;
  readonly account: UserAccountRequest;
}
