export interface RegisterAddressRequest {
  readonly addressLine: string;
  readonly street: string;
  readonly countryCode: string;
  readonly province: string;
  readonly city: string;
  readonly postalCode: string;
}
