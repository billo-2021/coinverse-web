import { UserProfileCountry } from './user-profile-country';

export interface UserProfileAddress {
  readonly addressLine: string;
  readonly street: string;
  readonly country: UserProfileCountry;
  readonly province: string;
  readonly city: string;
  readonly postalCode: string;
}
