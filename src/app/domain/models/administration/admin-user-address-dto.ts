import { AdminCountryDto } from './admin-country-dto';

export interface AdminUserAddressDto {
  readonly addressLine: string;
  readonly street: string;
  readonly country: AdminCountryDto;
  readonly province: string;
  readonly city: string;
  readonly postalCode: string;
}
