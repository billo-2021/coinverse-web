import {CountryResponse} from "./country-response";

export interface UserAddressResponse {
  readonly addressLine: string;
  readonly street: string;
  readonly country: CountryResponse;
  readonly province: string;
  readonly city: string;
  readonly postalCode: string;
}
