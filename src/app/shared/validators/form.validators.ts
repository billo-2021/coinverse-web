import { Validators } from '@angular/forms';

const Required = { nonNullable: true as const, validators: [Validators.required] };

const RequiredEmail = {
  nonNullable: true as const,
  validators: [Validators.required, Validators.email],
};

const RequiredAmount = (min = 1, max = 10_000_000_000_000) => ({
  nonNullable: true as const,
  validators: [Validators.required, Validators.min(min), Validators.max(max)],
});

const OtpLength = (length: number) => ({
  nonNullable: true as const,
  validators: [Validators.required, Validators.minLength(length)],
});

export const FormValidators = {
  Required,
  RequiredEmail,
  RequiredAmount,
  OtpLength,
} as const;
