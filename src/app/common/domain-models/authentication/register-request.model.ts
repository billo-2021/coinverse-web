import { RegisterAddressRequest } from './register-address-request.model';
import { RegisterPreferenceRequest } from './register-preference-request.model';
import { RegisterAccountRequest } from './register-account-request.model';

export interface RegisterRequest {
  firstName: string;
  lastName: string;
  emailAddress: string;
  phoneNumber: string;
  address: RegisterAddressRequest;
  preference: RegisterPreferenceRequest;
  account: RegisterAccountRequest;
}
