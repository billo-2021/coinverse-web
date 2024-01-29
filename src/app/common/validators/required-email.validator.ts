import { Validators } from '@angular/forms';

export const RequiredEmail = {
  nonNullable: true as const,
  validators: [Validators.required, Validators.email],
};
