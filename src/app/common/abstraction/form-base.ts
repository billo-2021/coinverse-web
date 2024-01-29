import {
  AbstractControl,
  AbstractControlOptions,
  AsyncValidatorFn,
  FormGroup,
  ValidatorFn,
} from '@angular/forms';
import { FormStatus, RawValue } from '../types';

export class FormBase<
  TControl extends {
    [K in keyof TControl]: AbstractControl<unknown>;
  },
> extends FormGroup<TControl> {
  public constructor(
    controls: TControl,
    validatorOrOpts?: ValidatorFn | ValidatorFn[] | AbstractControlOptions | null,
    asyncValidator?: AsyncValidatorFn | AsyncValidatorFn[] | null
  ) {
    super(controls, validatorOrOpts, asyncValidator);
  }

  public setFromModel(model: RawValue<FormGroup<TControl>>): void {
    (Object.keys(model) as Array<keyof RawValue<FormGroup<TControl>>>).forEach((key) => {
      if (key in this.controls) {
        this.controls[key].setValue(model[key]);
      }
    });
  }

  public getModel(): RawValue<FormGroup<TControl>> {
    return this.getRawValue();
  }

  public getFormStatus(): FormStatus {
    return { touched: this.touched, dirty: this.dirty, valid: this.valid };
  }
}
