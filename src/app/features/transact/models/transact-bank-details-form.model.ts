import { FormControl } from '@angular/forms';

export interface TransactBankDetailsForm {
  readonly name: FormControl<string>;
  readonly cardNumber: FormControl<string>;
  readonly expiryDate: FormControl<string>;
  readonly securityCode: FormControl<string>;
}
