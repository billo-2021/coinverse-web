import {
  ChangeDetectionStrategy,
  Component,
  HostBinding,
  Self,
  ViewEncapsulation,
} from '@angular/core';
import { finalize, Subject } from 'rxjs';

import { ApiError, AppError } from '../../../../core/models';
import { DestroyService } from '../../../../core/services/destroy/destroy.service';
import {
  AccountFormService,
  AddressFormService,
  AuthenticationService,
  FormSteps,
  messages,
  PersonalInformationFormService,
  PreferenceFormService,
  RegisterAccountRequest,
  RegisterAddressRequest,
  RegisterPreferenceRequest,
  RegisterRequest,
  UserFormBaseDirective,
} from '../../../../common';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    PersonalInformationFormService,
    AddressFormService,
    PreferenceFormService,
    AccountFormService,
    DestroyService,
  ],
})
export class RegisterComponent extends UserFormBaseDirective {
  protected readonly formError$ = new Subject<string>();
  @HostBinding('class') private _classes = 'block';

  public constructor(
    @Self() _personalInformationForm$: PersonalInformationFormService,
    @Self() _addressForm$: AddressFormService,
    @Self() _preferenceForm$: PreferenceFormService,
    @Self() _accountForm$: AccountFormService,
    private readonly _authenticationService: AuthenticationService,
    @Self() _destroy$: DestroyService
  ) {
    super(_personalInformationForm$, _addressForm$, _preferenceForm$, _accountForm$, _destroy$);
  }

  public onStepChanged(nextStepIndex: number) {
    if (nextStepIndex === FormSteps.ACCOUNT_DETAILS) {
      const emailAddress = this.personalInformationForm.controls.emailAddress.value;
      this.accountForm.controls.username.setValue(emailAddress);
    }

    if (nextStepIndex < this.MAX_NUMBER_OF_STEPS) {
      this.currentStepIndex = nextStepIndex;
      this.currentStepIndex = nextStepIndex;
      return;
    }

    this.onRegister();
  }

  public onRegister(): void {
    this.formError$.next('');
    const personalInformationFormValue = this.personalInformationForm.getRawValue();

    const registerRequest: RegisterRequest = {
      firstName: personalInformationFormValue.firstName,
      lastName: personalInformationFormValue.lastName,
      emailAddress: personalInformationFormValue.emailAddress.trim().toLowerCase(),
      phoneNumber: personalInformationFormValue.phoneNumber,
      address: this.getAddressRequest(),
      preference: this.getPreferenceRequest(),
      account: this.getAccountRequest(),
    };

    this._authenticationService
      .register(registerRequest)
      .pipe(finalize(() => this.resetForms()))
      .subscribe({
        error: (error) => {
          if (error instanceof ApiError) {
            this.formError$.next(error.message);
            return;
          }

          throw error;
        },
      });
  }

  public getAccountRequest(): RegisterAccountRequest {
    const accountFormValue = this.accountForm.getRawValue();

    return {
      username: accountFormValue.username.trim().toLowerCase(),
      password: accountFormValue.password,
    };
  }

  public getPreferenceRequest(): RegisterPreferenceRequest {
    const preferenceFormValue = this.preferenceForm.getRawValue();
    const rawNotificationMethods = preferenceFormValue.notificationMethods;

    if (!preferenceFormValue.currency) {
      throw new AppError(messages.invalidRegistrationDetails);
    }

    const notificationMethods = [rawNotificationMethods.email, rawNotificationMethods.sms]
      .filter((item) => item)
      .map((item, index) => (index === 0 ? 'email' : 'sms'));

    return {
      currencyCode: preferenceFormValue.currency.value.code,
      notificationMethods,
    };
  }

  public getAddressRequest(): RegisterAddressRequest {
    const addressFormValue = this.addressForm.getRawValue();

    if (!addressFormValue.country) {
      throw new AppError(messages.invalidRegistrationDetails);
    }

    return {
      addressLine: addressFormValue.addressLine,
      street: addressFormValue.street,
      countryCode: addressFormValue.country.value.code,
      province: addressFormValue.province,
      city: addressFormValue.city,
      postalCode: addressFormValue.postalCode,
    };
  }
}
