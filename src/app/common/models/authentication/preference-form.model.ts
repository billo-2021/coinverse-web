import { FormControl, FormGroup } from '@angular/forms';

import { ListOption } from '../../../form-components';
import { CurrencyResponse } from '../../domain-models/lookup';

interface NotificationMethodsForm {
  sms: FormControl<boolean>;
  email: FormControl<boolean>;
}

interface PreferenceForm {
  currency: FormControl<ListOption<CurrencyResponse> | null>;
  notificationMethods: FormGroup<NotificationMethodsForm>;
}

export { NotificationMethodsForm, PreferenceForm };
