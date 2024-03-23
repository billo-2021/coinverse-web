import { RegisterAddressRequest } from './register-address-request';
import { RegisterPreferenceRequest } from './register-preference-request';
import { RegisterAccountRequest } from './register-account-request';

export interface RegisterRequest {
  readonly firstName: string;
  readonly lastName: string;
  readonly emailAddress: string;
  readonly phoneNumber: string;
  readonly address: RegisterAddressRequest;
  readonly preference: RegisterPreferenceRequest;
  readonly account: RegisterAccountRequest;
}
