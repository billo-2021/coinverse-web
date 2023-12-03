import { ChangeDetectorRef, Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AdministrationService } from '../../../../common/domain-services';
import { finalize, tap } from 'rxjs';
import {
  UserAccountRequest,
  UserAddressRequest,
  UserPreferenceRequest,
  UserRequest,
} from '../../../../common/domain-models/administration';
import { AlertService } from '../../../../core/services';
import { Router } from '@angular/router';
import { webRoutesConfig } from '../../../../common/config/web-routes-config';

enum FormSteps {
  PERSONAL_INFORMATION,
  ADDRESS_DETAILS,
  PREFERENCE_DETAILS,
  ACCOUNT_DETAILS,
}

@Component({
  selector: 'app-manage-user',
  templateUrl: './manage-user.component.html',
  styleUrls: ['./manage-user.component.scss'],
})
export class ManageUserComponent {
  protected readonly title = 'Add new user';
  protected readonly subtitle = 'Add new user here';
  protected readonly personalInformationForm: FormGroup;
  protected readonly addressDetailsForm: FormGroup;
  protected readonly preferenceDetailsForm: FormGroup;
  protected readonly accountDetailsForm: FormGroup;
  protected readonly MAX_NUMBER_OF_STEPS = 4;
  protected readonly FORM_STEPS = FormSteps;
  protected currentStepIndex = 0;
  protected formSteps = ['Personal Information', 'Address', 'Preference', 'Account'];

  public constructor(
    private readonly changeDetectorRef: ChangeDetectorRef,
    private readonly router: Router,
    private formBuilder: FormBuilder,
    private alertService: AlertService,
    private administrationService: AdministrationService
  ) {
    this.personalInformationForm = this.getPersonalInformationForm(formBuilder);
    this.addressDetailsForm = this.getAddressForm(formBuilder);
    this.preferenceDetailsForm = this.getPreferenceForm(formBuilder);
    this.accountDetailsForm = this.getAccountForm(formBuilder);
  }

  public getPersonalInformationForm(formBuilder: FormBuilder): FormGroup {
    return formBuilder.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      emailAddress: ['', [Validators.required, Validators.email]],
      phoneNumber: ['', [Validators.required]],
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
      role: [null, [Validators.required]],
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
      return;
    }

    this.onAddUser();
  }

  public onAddUser(): void {
    const personalInformationFormValue = this.personalInformationForm.value;

    const registerRequest: UserRequest = {
      firstName: personalInformationFormValue.firstName,
      lastName: personalInformationFormValue.lastName,
      emailAddress: personalInformationFormValue.emailAddress.trim().toLowerCase(),
      phoneNumber: personalInformationFormValue.phoneNumber,
      address: this.getUserAddressRequest(),
      preference: this.getUserPreferenceRequest(),
      account: this.getUserAccountRequest(),
    };

    this.administrationService
      .addUser(registerRequest)
      .pipe(
        tap((response) => {
          this.alertService.showMessage(response.message);
          this.router.navigate([webRoutesConfig.manageUsers]).then();
        }),
        finalize(() => this.resetForms())
      )
      .subscribe();
  }

  public getUserAccountRequest(): UserAccountRequest {
    const accountDetailsFormValue = this.accountDetailsForm.value;
    return {
      username: accountDetailsFormValue.username.trim().toLowerCase(),
      roles: [accountDetailsFormValue.role.value.name],
      password: accountDetailsFormValue.password,
    };
  }

  public getUserPreferenceRequest(): UserPreferenceRequest {
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

  public getUserAddressRequest(): UserAddressRequest {
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

  private resetForms(): void {
    this.personalInformationForm.controls['emailAddress'].setValue('');
    this.personalInformationForm.markAsUntouched();
    this.accountDetailsForm.controls['username'].setValue('');
    this.accountDetailsForm.controls['password'].setValue('');
    this.accountDetailsForm.markAsUntouched();
    this.currentStepIndex = FormSteps.PERSONAL_INFORMATION;
  }
}
