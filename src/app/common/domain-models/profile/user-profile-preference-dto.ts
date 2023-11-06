import { UserProfileCurrencyDto } from './user-profile-currency-dto';
import { UserProfileNotificationMethodDto } from './user-profile-notification-method-dto';

export interface UserProfilePreferenceDto {
  readonly currency: UserProfileCurrencyDto;
  readonly notificationMethods: UserProfileNotificationMethodDto[];
}
