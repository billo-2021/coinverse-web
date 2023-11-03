import {UserProfileAddressDto} from "./user-profile-address-dto";
import {UserProfilePreferenceDto} from "./user-profile-preference-dto";

export interface UserProfileDto {
  readonly emailAddress: string;
  readonly firstName: string;
  readonly lastName: string;
  readonly phoneNumber: string;
  readonly address: UserProfileAddressDto;
  readonly preference: UserProfilePreferenceDto;
}
