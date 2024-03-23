import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  HostBinding,
  Injectable,
  Input,
  Optional,
  Output,
  SkipSelf,
  ViewEncapsulation,
} from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { FormBase, FormValidators } from '../../../../shared';
import { UpdateUserProfilePersonalInformation, UserProfile } from '../../../../domain';

export interface ProfileForm {
  readonly firstName: FormControl<string>;
  readonly lastName: FormControl<string>;
  readonly emailAddress: FormControl<string>;
  readonly phoneNumber: FormControl<string>;
}

export interface ProfileFormComponentInput {
  saveText: string;
  error: string | null;
  userProfile: UserProfile | null;
}

export interface ProfileFormComponentOutput {
  saveClicked: EventEmitter<UpdateUserProfilePersonalInformation>;
}

export function getProfileForm(): ProfileForm {
  return {
    firstName: new FormControl<string>('', FormValidators.Required),
    lastName: new FormControl<string>('', FormValidators.Required),
    emailAddress: new FormControl<string>('', FormValidators.RequiredEmail),
    phoneNumber: new FormControl<string>('', FormValidators.Required),
  };
}

@Injectable()
export class UserProfileFormService extends FormBase<ProfileForm> {
  public constructor() {
    super(getProfileForm());
  }
}

@Component({
  selector: 'app-profile-form',
  templateUrl: './profile-form.component.html',
  styleUrls: ['./profile-form.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProfileFormComponent implements ProfileFormComponentInput, ProfileFormComponentOutput {
  @Input() public saveText = 'Save Changes';
  @Input() public error: string | null = null;

  @Output() public saveClicked = new EventEmitter<UpdateUserProfilePersonalInformation>();

  @Input() public form: FormBase<ProfileForm> =
    this._userProfileForm ?? new FormBase<ProfileForm>(getProfileForm());

  @HostBinding('class') private _classes = 'block';

  public constructor(
    @Optional() @SkipSelf() private readonly _userProfileForm: UserProfileFormService | null
  ) {}

  private _userProfile: UserProfile | null = null;

  @Input()
  public set userProfile(value: UserProfile) {
    this._userProfile = value;
    this.form.setFromModel(value);
  }

  protected get formGroup(): FormGroup<ProfileForm> {
    return this.form;
  }

  public onSaveChanges(): void {
    const profileFormModel = this.form.getModel();

    const personalInformationUpdateRequest: UpdateUserProfilePersonalInformation = {
      firstName: profileFormModel.firstName,
      lastName: profileFormModel.lastName,
      emailAddress: profileFormModel.emailAddress,
      phoneNumber: profileFormModel.phoneNumber,
    };

    this.saveClicked.emit(personalInformationUpdateRequest);
  }
}
