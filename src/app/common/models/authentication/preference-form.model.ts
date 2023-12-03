import { FormControl, FormGroup } from '@angular/forms';
import { ListOption } from '../../../form-components/types';
import { CurrencyResponse } from '../../domain-models';

interface NotificationMethodsForm {
  sms: FormControl<boolean>;
  email: FormControl<boolean>;
}

interface PreferenceForm {
  currency: FormControl<ListOption<CurrencyResponse> | null>;
  notificationMethods: FormGroup<NotificationMethodsForm>;
}

export { NotificationMethodsForm, PreferenceForm };
