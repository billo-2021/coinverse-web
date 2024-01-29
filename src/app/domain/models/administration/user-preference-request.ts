export interface UserPreferenceRequest {
  readonly currencyCode: string;
  readonly notificationMethods: readonly string[];
}
