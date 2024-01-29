import { UserProfileAddress } from './user-profile-address';
import { UserProfilePreference } from './user-profile-preference';

export interface UserProfile {
  readonly emailAddress: string;
  readonly firstName: string;
  readonly lastName: string;
  readonly phoneNumber: string;
  readonly address: UserProfileAddress;
  readonly preference: UserProfilePreference;
}
