import { AbstractControl, FormGroup } from '@angular/forms';
import { combineLatest, Observable, tap } from 'rxjs';

export function disableWhenLoading(
  form:
    | FormGroup<Record<string, AbstractControl<unknown, unknown>>>
    | AbstractControl<unknown>
    | Array<AbstractControl<unknown> | null>
    | null,
  disabled: Observable<boolean>,
  loading$: Observable<boolean>
) {
  return combineLatest([loading$, disabled]).pipe(
    tap(([isLoading, isDisabled]) => {
      const disabled = isLoading || isDisabled;

      if (!form) {
        return;
      }

      if (!disabled) {
        if (Array.isArray(form)) {
          form.forEach((control) => control && control.enable());
          return;
        }

        form.enable();
        return;
      }

      if (Array.isArray(form)) {
        form.forEach((control) => control && control.enable());
        return;
      }

      form.disable();
    })
  );
}
