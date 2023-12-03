import { FormControl } from '@angular/forms';

export interface ResetPasswordRequestForm {
  readonly username: FormControl<string>;
}
