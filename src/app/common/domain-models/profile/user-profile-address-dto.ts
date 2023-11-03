import {UserProfileCountryDto} from "./user-profile-country-dto";

export interface UserProfileAddressDto {
  readonly addressLine: string;
  readonly street: string;
  readonly country: UserProfileCountryDto;
  readonly province: string;
  readonly city: string;
  readonly postalCode: string;
}
