import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  HostBinding,
  Inject,
  OnInit,
  ViewEncapsulation,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from '../../../../common/domain-services';
import { finalize } from 'rxjs';
import {
  RegisterAccountRequest,
  RegisterAddressRequest,
  RegisterPreferenceRequest,
  RegisterRequest,
} from '../../../../common/domain-models';

type FormStateType = 'error' | 'normal' | 'pass';

type FormState = {
  state: FormStateType;
  isDisabled: boolean;
};

type FormStep = {
  title: string;
} & FormState;

enum FormSteps {
  PERSONAL_INFORMATION,
  ADDRESS_DETAILS,
  PREFERENCE_DETAILS,
  ACCOUNT_DETAILS,
}

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RegisterComponent implements OnInit {
  @HostBinding('class') public classes = 'full-width flex-col justify-center items-center';
  protected readonly personalInformationForm: FormGroup;
  protected readonly addressDetailsForm: FormGroup;
  protected readonly preferenceDetailsForm: FormGroup;
  protected readonly accountDetailsForm: FormGroup;
  protected readonly MAX_NUMBER_OF_STEPS = 4;
  protected readonly FORM_STEPS = FormSteps;
  protected currentStepIndex = 0;
  protected formSteps: FormStep[];

  public constructor(
    @Inject(ChangeDetectorRef)
    private readonly changeDetectorRef: ChangeDetectorRef,
    @Inject(FormBuilder) private readonly formBuilder: FormBuilder,
    @Inject(AuthenticationService)
    private readonly authenticationService: AuthenticationService
  ) {
    this.personalInformationForm = this.getPersonalInformationForm(formBuilder);
    this.addressDetailsForm = this.getAddressForm(formBuilder);
    this.preferenceDetailsForm = this.getPreferenceForm(formBuilder);
    this.accountDetailsForm = this.getAccountForm(formBuilder);

    this.formSteps = this.getFormSteps();
  }

  public getPersonalInformationForm(formBuilder: FormBuilder): FormGroup {
    return formBuilder.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      emailAddress: ['', [Validators.required, Validators.email]],
      phoneNumber: ['', [Validators.required]],
    });
  }

  public getFormSteps(): FormStep[] {
    return [
      this.getFormStep(
        'Personal Information',
        this.personalInformationForm,
        FormSteps.PERSONAL_INFORMATION,
        this.personalInformationForm
      ),
      this.getFormStep(
        'Address',
        this.addressDetailsForm,
        FormSteps.ADDRESS_DETAILS,
        this.personalInformationForm
      ),
      this.getFormStep(
        'Preference',
        this.preferenceDetailsForm,
        FormSteps.PREFERENCE_DETAILS,
        this.addressDetailsForm
      ),
      this.getFormStep(
        'Account',
        this.accountDetailsForm,
        FormSteps.ACCOUNT_DETAILS,
        this.preferenceDetailsForm
      ),
    ];
  }

  public updateFormSteps(): void {
    const updatedFormSteps = this.getFormSteps();

    this.formSteps.forEach((step, index) => {
      const updatedStep = updatedFormSteps[index];
      step.state = updatedStep.state;
      step.isDisabled = updatedStep.isDisabled;
    });
  }

  public getAddressForm(formBuilder: FormBuilder): FormGroup {
    return formBuilder.group({
      addressLine: ['', [Validators.required]],
      street: ['', [Validators.required]],
      country: [null, [Validators.required]],
      province: ['', [Validators.required]],
      city: ['', [Validators.required]],
      postalCode: ['', [Validators.required]],
    });
  }

  public getPreferenceForm(formBuilder: FormBuilder): FormGroup {
    return formBuilder.group({
      currency: [null, [Validators.required]],
      notificationMethods: formBuilder.group({
        sms: [false],
        email: [true],
      }),
    });
  }

  public getAccountForm(formBuilder: FormBuilder): FormGroup {
    return formBuilder.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });
  }

  public onStepChanged(nextStepIndex: number) {
    if (nextStepIndex === FormSteps.ACCOUNT_DETAILS) {
      const emailAddress = this.personalInformationForm.controls['emailAddress'].value;

      this.accountDetailsForm.controls['username'].setValue(emailAddress);
    }

    if (nextStepIndex < this.MAX_NUMBER_OF_STEPS) {
      this.currentStepIndex = nextStepIndex;
      this.updateFormSteps();
      return;
    }

    this.onRegister();
  }

  public getFormStep(
    title: string,
    form: FormGroup,
    formStep: FormSteps,
    previousForm: FormGroup
  ): FormStep {
    return {
      title,
      state:
        !form.touched && formStep >= this.currentStepIndex
          ? 'normal'
          : form.valid
            ? 'pass'
            : 'error',
      isDisabled: !previousForm.valid || formStep >= this.currentStepIndex,
    };
  }

  public onRegister(): void {
    const personalInformationFormValue = this.personalInformationForm.value;

    const registerRequest: RegisterRequest = {
      firstName: personalInformationFormValue.firstName,
      lastName: personalInformationFormValue.lastName,
      emailAddress: personalInformationFormValue.emailAddress.trim().toLowerCase(),
      phoneNumber: personalInformationFormValue.phoneNumber,
      address: this.getRegisterAddressRequest(),
      preference: this.getRegisterPreferenceRequest(),
      account: this.getRegisterAccountRequest(),
    };

    this.authenticationService
      .register(registerRequest)
      .pipe(finalize(() => this.resetForms()))
      .subscribe();
  }

  public getRegisterAccountRequest(): RegisterAccountRequest {
    const accountDetailsFormValue = this.accountDetailsForm.value;
    return {
      username: accountDetailsFormValue.username.trim().toLowerCase(),
      password: accountDetailsFormValue.password,
    };
  }

  public getRegisterPreferenceRequest(): RegisterPreferenceRequest {
    const preferenceDetailsValue = this.preferenceDetailsForm.value;
    const notificationMethodsValue = preferenceDetailsValue.notificationMethods;

    const notificationMethods = [notificationMethodsValue.email, notificationMethodsValue.sms]
      .filter((item) => !!item)
      .map((item, index) => (index === 0 ? 'email' : 'sms'));

    return {
      currencyCode: preferenceDetailsValue.currency.value.code,
      notificationMethods,
    };
  }

  public getRegisterAddressRequest(): RegisterAddressRequest {
    const addressDetailsFormValue = this.addressDetailsForm.value;
    return {
      addressLine: addressDetailsFormValue.addressLine,
      street: addressDetailsFormValue.street,
      countryCode: addressDetailsFormValue.country.value.code,
      province: addressDetailsFormValue.province,
      city: addressDetailsFormValue.city,
      postalCode: addressDetailsFormValue.postalCode,
    };
  }

  ngOnInit(): void {
    throw new Error('Something went wrong');
  }

  private resetForms(): void {
    this.personalInformationForm.controls['emailAddress'].setValue('');
    this.personalInformationForm.markAsUntouched();
    this.accountDetailsForm.controls['username'].setValue('');
    this.accountDetailsForm.controls['password'].setValue('');
    this.accountDetailsForm.markAsUntouched();
    this.currentStepIndex = FormSteps.PERSONAL_INFORMATION;
  }
}
