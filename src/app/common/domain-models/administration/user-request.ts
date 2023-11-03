import {UserAddressRequest} from "./user-address-request";
import {UserPreferenceRequest} from "./user-preference-request";
import {UserAccountRequest} from "./user-account-request";

export interface UserRequest {
  firstName: string;
  lastName: string;
  emailAddress: string;
  phoneNumber: string;
  address: UserAddressRequest;
  preference: UserPreferenceRequest;
  account: UserAccountRequest;
}
