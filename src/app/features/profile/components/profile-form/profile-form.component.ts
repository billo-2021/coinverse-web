import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable, tap } from 'rxjs';

import { AlertService } from '../../../../core';
import { ProfileService } from '../../../../common';
import {
  UserProfilePersonalInformationUpdate,
  UserProfileResponse,
} from '../../../../common/domain-models/profile';

@Component({
  selector: 'app-profile-form',
  templateUrl: './profile-form.component.html',
  styleUrls: ['./profile-form.component.scss'],
})
export class ProfileFormComponent {
  @Input() public form: FormGroup;
  @Input() public saveText = 'Save Changes';

  @Output() public saveClicked = new EventEmitter<FormGroup>();

  protected readonly userProfileResponse$: Observable<UserProfileResponse>;

  public constructor(
    private readonly _formBuilder: FormBuilder,
    private readonly _alertService: AlertService,
    private readonly _profileService: ProfileService
  ) {
    this.form = this.getProfileForm(_formBuilder);
    this.userProfileResponse$ = _profileService.getProfile();

    this.userProfileResponse$
      .pipe(
        tap((userProfile) => {
          this.form.controls['firstName']?.setValue(userProfile.firstName);
          this.form.controls['lastName']?.setValue(userProfile.lastName);
          this.form.controls['emailAddress']?.setValue(userProfile.emailAddress);
          this.form.controls['phoneNumber']?.setValue(userProfile.phoneNumber);
        })
      )
      .subscribe();
  }

  public onSaveChanges(): void {
    const personaInformationFormValue = this.form.value;

    const personalInformationUpdateRequest: UserProfilePersonalInformationUpdate = {
      firstName: personaInformationFormValue.firstName,
      lastName: personaInformationFormValue.lastName,
      emailAddress: personaInformationFormValue.emailAddress,
      phoneNumber: personaInformationFormValue.phoneNumber,
    };

    this._profileService
      .updatePersonalInformation(personalInformationUpdateRequest)
      .pipe(
        tap(() => {
          this._alertService.showMessage('Personal Information Updated');
          this.saveClicked.emit();
        })
      )
      .subscribe();
  }

  private getProfileForm(formBuilder: FormBuilder) {
    return formBuilder.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      emailAddress: ['', [Validators.required, Validators.email]],
      phoneNumber: ['', [Validators.required]],
    });
  }
}
