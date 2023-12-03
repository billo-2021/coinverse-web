import { Directive, SkipSelf } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { AccountForm, AddressForm, PersonalInformationForm, PreferenceForm } from '../../models';
import { map, merge, Observable } from 'rxjs';
import { StepOptions } from '../../../ui-components/components/stepper/stepper.types';
import { PersonalInformationFormService } from '../../services/personal-information-form/personal-information-form.service';
import { AddressFormService } from '../../services/address-form/address-form.service';
import { PreferenceFormService } from '../../services/preference-form/preference-form.service';
import { AccountFormService } from '../../services/account-form/account-form.service';
import { DestroyService } from '../../../core/services/destroy/destroy.service';

export enum FormSteps {
  PERSONAL_INFORMATION,
  ADDRESS_DETAILS,
  PREFERENCE_DETAILS,
  ACCOUNT_DETAILS,
}

@Directive({ selector: '[appFormBaseDirective]' })
export class UserFormBaseDirective {
  protected readonly FORM_STEPS = FormSteps;
  protected readonly personalInformationForm: FormGroup<PersonalInformationForm>;
  protected readonly addressForm: FormGroup<AddressForm>;
  protected readonly preferenceForm: FormGroup<PreferenceForm>;
  protected readonly accountForm: FormGroup<AccountForm>;
  protected readonly MAX_NUMBER_OF_STEPS = 4;
  protected readonly formStepOptions$: Observable<StepOptions[]>;
  protected readonly formSteps = ['Personal Information', 'Address', 'Preference', 'Account'];
  protected currentStepIndex: FormSteps = FormSteps.PERSONAL_INFORMATION;

  constructor(
    @SkipSelf() private readonly _personalInformationForm$: PersonalInformationFormService,
    @SkipSelf() private readonly _addressForm$: AddressFormService,
    @SkipSelf() private readonly _preferenceForm$: PreferenceFormService,
    @SkipSelf() private readonly _accountForm$: AccountFormService,
    @SkipSelf() private readonly _destroy$: DestroyService
  ) {
    this.personalInformationForm = _personalInformationForm$.value;
    this.addressForm = _addressForm$.value;
    this.preferenceForm = _preferenceForm$.value;
    this.accountForm = _accountForm$.value;

    this.formStepOptions$ = this.getFormStepsOptions();
  }

  protected resetForms(): void {
    this.personalInformationForm.controls.emailAddress.setValue('');
    this.personalInformationForm.markAsUntouched();
    this.accountForm.controls.username.setValue('');
    this.accountForm.controls.password.setValue('');
    this.accountForm.markAsUntouched();
    this.currentStepIndex = FormSteps.PERSONAL_INFORMATION;
  }

  private getFormStepsOptions(): Observable<StepOptions[]> {
    return merge(
      this.personalInformationForm.statusChanges,
      this.addressForm.statusChanges,
      this.preferenceForm.statusChanges,
      this.accountForm.statusChanges
    ).pipe(
      map(() => {
        return [
          {
            state: !this.personalInformationForm.touched
              ? 'normal'
              : this.personalInformationForm.valid
                ? 'pass'
                : 'error',
            isDisabled: false,
          },
          {
            state:
              this.addressForm.valid || this.currentStepIndex > 1
                ? 'pass'
                : !this.addressForm.touched
                  ? 'normal'
                  : 'error',
            isDisabled: !this.personalInformationForm.valid,
          },
          {
            state:
              this.preferenceForm.valid || this.currentStepIndex > 2
                ? 'pass'
                : !this.preferenceForm.touched
                  ? 'normal'
                  : 'error',
            isDisabled: !this.addressForm.valid,
          },
          {
            state: !this.accountForm.touched ? 'normal' : this.accountForm.valid ? 'pass' : 'error',
            isDisabled: !this.preferenceForm.valid,
          },
        ];
      })
    );
  }
}
