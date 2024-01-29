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
import { FormBase, RequiredEmail } from '../../../../common';
import { TextFieldComponent } from '../../../../form-components';

export interface ResetPasswordRequestForm {
  readonly username: FormControl<string>;
}

export interface ResetPasswordRequestFormComponentInput {
  saveText: string;
}

export interface ResetPasswordRequestFormComponentOutput {
  saveClicked: EventEmitter<FormBase<ResetPasswordRequestForm>>;
}

export function getResetPasswordRequestForm(): ResetPasswordRequestForm {
  return {
    username: new FormControl<string>('', RequiredEmail),
  };
}

@Injectable()
export class ResetPasswordRequestFormService extends FormBase<ResetPasswordRequestForm> {
  public constructor() {
    super(getResetPasswordRequestForm());
  }

  public resetForm() {
    this.controls.username.reset();
    this.markAsUntouched();
  }
}

@Component({
  selector: 'app-reset-password-request-form',
  templateUrl: './reset-password-request-form.component.html',
  styleUrls: ['./reset-password-request-form.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ResetPasswordRequestFormComponent
  implements
    ResetPasswordRequestFormComponentInput,
    ResetPasswordRequestFormComponentOutput,
    AfterViewInit
{
  @Input() public saveText = 'Reset password';

  @Output() public saveClicked = new EventEmitter<FormBase<ResetPasswordRequestForm>>();
  public readonly form: FormBase<ResetPasswordRequestForm> =
    this._resetPasswordRequestForm ??
    new FormBase<ResetPasswordRequestForm>(getResetPasswordRequestForm());

  @HostBinding('class') private _classes = 'block';

  @ViewChild(TextFieldComponent) private readonly _usernameRef?: TextFieldComponent;

  public constructor(
    @Optional()
    @SkipSelf()
    private readonly _resetPasswordRequestForm: ResetPasswordRequestFormService | null,
    private readonly _changeDetectorRef: ChangeDetectorRef
  ) {}

  protected get formGroup(): FormGroup<ResetPasswordRequestForm> {
    return this.form;
  }

  public ngAfterViewInit(): void {
    if (!this._usernameRef) {
      return;
    }

    this._usernameRef.focusInput(false);
    this._changeDetectorRef.detectChanges();
  }

  public onSaveClicked(): void {
    this.saveClicked.emit(this.form);
  }
}
