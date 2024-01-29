import {
  ChangeDetectionStrategy,
  Component,
  HostBinding,
  Self,
  ViewEncapsulation,
} from '@angular/core';
import { finalize } from 'rxjs';
import { Mapper } from '@dynamic-mapper/angular';
import { DestroyService } from '../../../../core';
import { getErrorMessage } from '../../../../common';
import {
  AccountFormService,
  AddressFormService,
  AuthenticationService,
  MappingProfile,
  PersonalInformationFormService,
  PreferenceFormService,
  RegisterRequest,
  UserFormController,
  UserFormStep,
} from '../../../../domain';

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
    UserFormController,
  ],
})
export class RegisterComponent {
  @HostBinding('class') private _classes = 'block';

  public constructor(
    @Self() private readonly _personalInformationFormService: PersonalInformationFormService,
    @Self() private readonly _addressFormService: AddressFormService,
    @Self() private readonly _preferenceFormService: PreferenceFormService,
    @Self() private readonly _accountFormService: AccountFormService,
    @Self() private readonly _userFormController: UserFormController,
    private readonly _authenticationService: AuthenticationService,
    private readonly _mapper: Mapper
  ) {}

  public onStepChanged(nextStepIndex: UserFormStep) {
    if (nextStepIndex === UserFormStep.AccountDetails) {
      const emailAddress = this._personalInformationFormService.controls.emailAddress.value;
      this._accountFormService.controls.username.setValue(emailAddress);
    }
  }

  public onRegister(): void {
    const personalInformationFormValue = this._personalInformationFormService.getModel();

    const addressFormValue = this._addressFormService.getModel();
    const preferenceFormValue = this._preferenceFormService.getModel();
    const accountFormValue = this._accountFormService.getModel();

    const registerRequest: RegisterRequest = {
      ...this._mapper.map(
        MappingProfile.PersonalInformationFormValueToRegisterPersonalInformationRequest,
        personalInformationFormValue
      ),
      address: this._mapper.map(
        MappingProfile.AddressFormValueToRegisterAddressRequest,
        addressFormValue
      ),
      preference: this._mapper.map(
        MappingProfile.PreferenceFormValueToRegisterPreferenceRequest,
        preferenceFormValue
      ),
      account: this._mapper.map(
        MappingProfile.AccountFormValueToRegisterAccountRequest,
        accountFormValue
      ),
    };

    this._authenticationService
      .register(registerRequest)
      .pipe(finalize(() => this._userFormController.resetForms()))
      .subscribe({
        error: (error) => (this._userFormController.formError = getErrorMessage(error)),
      });
  }
}
