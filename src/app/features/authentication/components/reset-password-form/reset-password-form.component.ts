import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  HostBinding,
  Injectable,
  Input,
  Optional,
  Output,
  SkipSelf,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { FormBase, Required } from '../../../../common';
import { TextFieldComponent } from '../../../../form-components';

export interface ResetPasswordForm {
  readonly password: FormControl<string>;
}

export interface ResetPasswordFormComponentInput {
  saveText: string;
}

export interface ResetPasswordComponentOutput {
  saveClicked: EventEmitter<FormBase<ResetPasswordForm>>;
}

export function getResetPasswordForm(): ResetPasswordForm {
  return {
    password: new FormControl<string>('', Required),
  };
}

@Injectable()
export class ResetPasswordFormService extends FormBase<ResetPasswordForm> {
  public constructor() {
    super(getResetPasswordForm());
  }

  public resetForm(): void {
    this.controls.password.setValue('');
    this.markAsUntouched();
  }
}

@Component({
  selector: 'app-reset-password-form',
  templateUrl: './reset-password-form.component.html',
  styleUrls: ['./reset-password-form.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ResetPasswordFormComponent
  implements ResetPasswordFormComponentInput, ResetPasswordComponentOutput, AfterViewInit
{
  @Input() public saveText = 'Reset password';

  @Output() public saveClicked = new EventEmitter<FormBase<ResetPasswordForm>>();

  @ViewChild(TextFieldComponent) passwordRef?: TextFieldComponent;
  public readonly form: FormBase<ResetPasswordForm> =
    this._resetPasswordForm ?? new FormBase<ResetPasswordForm>(getResetPasswordForm());

  @HostBinding('class') private _classes = 'block';

  public constructor(
    @Optional() @SkipSelf() private readonly _resetPasswordForm: ResetPasswordFormService | null,
    private readonly _changeDetectorRef: ChangeDetectorRef
  ) {}

  protected get formGroup(): FormGroup<ResetPasswordForm> {
    return this.form;
  }

  public ngAfterViewInit(): void {
    if (!this.passwordRef) {
      return;
    }

    this.passwordRef.focusInput(false);
    this._changeDetectorRef.detectChanges();
  }

  public onSaveClicked(): void {
    this.saveClicked.emit(this.form);
  }
}
