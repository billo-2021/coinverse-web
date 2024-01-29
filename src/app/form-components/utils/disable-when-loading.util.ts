import { AbstractControl, FormGroup } from '@angular/forms';
import { Observable, tap } from 'rxjs';

export function disableWhenLoading(
  form:
    | FormGroup<Record<string, AbstractControl<unknown, unknown>>>
    | AbstractControl<unknown>
    | Array<AbstractControl<unknown> | null>
    | null,
  loading$: Observable<boolean>
) {
  return loading$.pipe(
    tap((loading) => {
      if (!form) {
        return;
      }

      if (!loading) {
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
