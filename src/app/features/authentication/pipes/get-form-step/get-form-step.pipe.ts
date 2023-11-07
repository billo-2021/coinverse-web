import { Pipe, PipeTransform } from '@angular/core';

type FormStepType = {
  title: string;
  state: 'error' | 'normal' | 'pass';
  isDisabled: boolean;
};

@Pipe({
  name: 'getFormStep',
})
export class GetFormStepPipe implements PipeTransform {
  transform(valid: boolean, touched: boolean, title: string): FormStepType {
    const state = !touched ? 'normal' : touched && valid ? 'pass' : 'error';

    return {
      title,
      state,
      isDisabled: !valid,
    };
  }
}
