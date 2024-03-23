import {
  ChangeDetectionStrategy,
  Component,
  HostBinding,
  Self,
  ViewEncapsulation,
} from '@angular/core';
import { finalize } from 'rxjs';
import { Mapper } from '@dynamic-mapper/angular';
import {
  AlertService,
  DestroyState,
  ErrorUtils,
  NavigationController,
  Page,
  WebRoute,
} from '../../../../shared';
import {
  AccountFormService,
  AddressFormService,
  AddUser,
  AdministrationService,
  MappingProfile,
  PersonalInformationFormService,
  PreferenceFormService,
  UserFormController,
  UserFormStep,
} from '../../../../domain';

@Component({
  selector: 'app-manage-user',
  templateUrl: './manage-user.component.html',
  styleUrls: ['./manage-user.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    UserFormController,
    PersonalInformationFormService,
    AddressFormService,
    PreferenceFormService,
    AccountFormService,
    DestroyState,
  ],
})
export class ManageUserComponent implements Page {
  public readonly title = 'Add new user';
  public readonly subtitle = 'Add new user here.';
  @HostBinding('class') private _classes = 'block';

  public constructor(
    @Self() private readonly _personalInformationFormService: PersonalInformationFormService,
    @Self() private readonly _addressFormService: AddressFormService,
    @Self() private readonly _preferenceFormService: PreferenceFormService,
    @Self() private readonly _accountFormService: AccountFormService,
    @Self() private readonly _userFormController: UserFormController,
    private readonly _navigationController: NavigationController,
    private readonly _alertService: AlertService,
    private readonly _administrationService: AdministrationService,
    private readonly _mapper: Mapper
  ) {}

  public onStepChanged(nextStepIndex: UserFormStep) {
    if (nextStepIndex === UserFormStep.AccountDetails) {
      const emailAddress = this._personalInformationFormService.controls.emailAddress.value;
      this._accountFormService.controls.username.setValue(emailAddress);
    }
  }

  public onAddUser(): void {
    const personalInformationFormValue = this._personalInformationFormService.getModel();

    const addressFormValue = this._addressFormService.getModel();
    const preferenceFormValue = this._preferenceFormService.getModel();
    const accountFormValue = this._accountFormService.getModel();

    const registerRequest: AddUser = {
      ...this._mapper.map(
        MappingProfile.PersonalInformationFormValueToUserPersonalInformationRequest,
        personalInformationFormValue
      ),
      address: this._mapper.map(
        MappingProfile.AddressFormValueToUserAddressRequest,
        addressFormValue
      ),
      preference: this._mapper.map(
        MappingProfile.PreferenceFormValueToUserPreferenceRequest,
        preferenceFormValue
      ),
      account: this._mapper.map(
        MappingProfile.AccountFormValueToUserAccountRequest,
        accountFormValue
      ),
    };

    this._administrationService
      .addUser(registerRequest)
      .pipe(finalize(() => this._userFormController.resetForms()))
      .subscribe({
        next: () => {
          this._alertService.showMessage('User added successfully');
          this._navigationController.to(WebRoute.MANAGE_USERS).then();
        },
        error: (error) => (this._userFormController.formError = ErrorUtils.getErrorMessage(error)),
      });
  }
}
