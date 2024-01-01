import { UserProfileAddressResponse } from './user-profile-address-response';
import { UserProfilePreferenceResponse } from './user-profile-preference-response';

export interface UserProfileResponse {
  readonly emailAddress: string;
  readonly firstName: string;
  readonly lastName: string;
  readonly phoneNumber: string;
  readonly address: UserProfileAddressResponse;
  readonly preference: UserProfilePreferenceResponse;
}
