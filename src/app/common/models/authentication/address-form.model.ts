import { FormControl } from '@angular/forms';

import { CountryResponse } from '../../domain-models/lookup';
import { ListOption } from '../../../form-components/types';

export interface AddressForm {
  addressLine: FormControl<string>;
  street: FormControl<string>;
  country: FormControl<ListOption<CountryResponse> | null>;
  province: FormControl<string>;
  city: FormControl<string>;
  postalCode: FormControl<string>;
}
