import { Validators } from '@angular/forms';

export const OtpLength = (length: number) => ({
  nonNullable: true as const,
  validators: [Validators.required, Validators.minLength(length)],
});
