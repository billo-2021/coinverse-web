import { Validators } from '@angular/forms';

export const Required = { nonNullable: true as const, validators: [Validators.required] };
