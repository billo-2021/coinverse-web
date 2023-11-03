import {UserProfileNotificationMethodResponse} from "./user-profile-notification-method-response";
import {UserProfileCurrencyResponse} from "./user-profile-currency-response";

export interface UserProfilePreferenceResponse {
  readonly currency: UserProfileCurrencyResponse;
  readonly notificationMethods: UserProfileNotificationMethodResponse[];
}
