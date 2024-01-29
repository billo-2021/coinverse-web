import { RegisterAddressRequest } from './register-address-request.model';
import { RegisterPreferenceRequest } from './register-preference-request.model';
import { RegisterAccountRequest } from './register-account-request.model';

export interface RegisterRequest {
  readonly firstName: string;
  readonly lastName: string;
  readonly emailAddress: string;
  readonly phoneNumber: string;
  readonly address: RegisterAddressRequest;
  readonly preference: RegisterPreferenceRequest;
  readonly account: RegisterAccountRequest;
}
