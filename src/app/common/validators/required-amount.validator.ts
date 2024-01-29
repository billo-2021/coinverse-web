import { Validators } from '@angular/forms';

export const RequiredAmount = (min = 1, max = 10_000_000_000_000) => ({
  nonNullable: true as const,
  validators: [Validators.required, Validators.min(min), Validators.max(max)],
});
