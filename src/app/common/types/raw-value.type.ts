import { AbstractControl } from '@angular/forms';

export type RawValue<T extends AbstractControl> = T['setValue'] extends (v: infer R) => void
  ? R
  : never;
