import { FormControl } from '@angular/forms';

export interface AccountForm {
  username: FormControl<string>;
  password: FormControl<string>;
}
