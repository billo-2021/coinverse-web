import { AdminCountry } from './admin-country';

export interface AdminUserAddress {
  readonly addressLine: string;
  readonly street: string;
  readonly country: AdminCountry;
  readonly province: string;
  readonly city: string;
  readonly postalCode: string;
}
