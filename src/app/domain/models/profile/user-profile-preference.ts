import { UserProfileNotificationMethod } from './user-profile-notification-method';
import { UserProfileCurrency } from './user-profile-currency';

export interface UserProfilePreference {
  readonly currency: UserProfileCurrency;
  readonly notificationMethods: readonly UserProfileNotificationMethod[];
}
