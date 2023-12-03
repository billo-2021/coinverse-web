import { FormControl } from '@angular/forms';

export interface PersonalInformationForm {
  firstName: FormControl<string>;
  lastName: FormControl<string>;
  emailAddress: FormControl<string>;
  phoneNumber: FormControl<string>;
}
