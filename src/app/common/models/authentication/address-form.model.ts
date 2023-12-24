import { FormControl } from '@angular/forms';

import { ListOption } from '../../../form-components';
import { CountryResponse } from '../../domain-models/lookup';

export interface AddressForm {
  addressLine: FormControl<string>;
  street: FormControl<string>;
  country: FormControl<ListOption<CountryResponse> | null>;
  province: FormControl<string>;
  city: FormControl<string>;
  postalCode: FormControl<string>;
}
