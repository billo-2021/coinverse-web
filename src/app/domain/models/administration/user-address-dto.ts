import { CountryDto } from './country-dto';

export interface UserAddressDto {
  readonly addressLine: string;
  readonly street: string;
  readonly country: CountryDto;
  readonly province: string;
  readonly city: string;
  readonly postalCode: string;
}
