import { UserProfileCountryResponse } from './user-profile-country-response';

export interface UserProfileAddressResponse {
  readonly addressLine: string;
  readonly street: string;
  readonly country: UserProfileCountryResponse;
  readonly province: string;
  readonly city: string;
  readonly postalCode: string;
}
