export interface RegisterPreferenceRequest {
  readonly currencyCode: string;
  readonly notificationMethods: readonly string[];
}
