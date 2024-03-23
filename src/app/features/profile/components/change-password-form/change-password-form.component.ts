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
import { ChangePassword } from '../../../../domain';

export interface ChangePasswordForm {
  readonly currentPassword: FormControl<string>;
  readonly newPassword: FormControl<string>;
}

export interface ChangePasswordFormComponentInput {
  saveText: string;
  error: string | null;
}

export interface ChangePasswordFormComponentOutput {
  saveClicked: EventEmitter<ChangePassword>;
}

export function getChangePasswordForm(): ChangePasswordForm {
  return {
    currentPassword: new FormControl<string>('', FormValidators.Required),
    newPassword: new FormControl<string>('', FormValidators.Required),
  };
}

@Injectable()
export class ChangePasswordFormService extends FormBase<ChangePasswordForm> {
  public constructor() {
    super(getChangePasswordForm());
  }
}

@Component({
  selector: 'app-change-password-form',
  templateUrl: './change-password-form.component.html',
  styleUrls: ['./change-password-form.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChangePasswordFormComponent
  implements ChangePasswordFormComponentInput, ChangePasswordFormComponentOutput
{
  @Input() public saveText = 'Change Password';
  @Input() public error: string | null = null;

  @Output() public saveClicked = new EventEmitter<ChangePassword>();

  public readonly form: FormBase<ChangePasswordForm> =
    this._changePasswordForm ?? new FormBase<ChangePasswordForm>(getChangePasswordForm());

  @HostBinding('class') private _classes = 'block';

  public constructor(
    @Optional() @SkipSelf() private readonly _changePasswordForm: ChangePasswordFormService | null
  ) {}

  protected get formGroup(): FormGroup<ChangePasswordForm> {
    return this.form;
  }

  public onSaveChanges(): void {
    const changePasswordModel = this.form.getModel();

    const changePasswordRequest: ChangePassword = {
      currentPassword: changePasswordModel.currentPassword,
      newPassword: changePasswordModel.newPassword,
    };

    this.saveClicked.emit(changePasswordRequest);
  }
}
