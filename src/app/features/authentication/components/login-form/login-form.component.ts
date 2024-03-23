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
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { FocusOptions, FormBase, FormValidators } from '../../../../shared';
import { PasswordFieldComponent, TextFieldComponent } from '../../../../form-components';

export interface LoginForm {
  readonly username: FormControl<string>;
  readonly password: FormControl<string>;
  readonly rememberMe: FormControl<boolean>;
}

export interface LoginFormComponentInput {
  title: string;
  subtitle: string;
  saveText: string;
}

export interface LoginFormComponentOutput {
  saveClicked: EventEmitter<FormBase<LoginForm>>;
}

export function getLoginForm(): LoginForm {
  return {
    username: new FormControl<string>('', FormValidators.RequiredEmail),
    password: new FormControl<string>('', FormValidators.Required),
    rememberMe: new FormControl<boolean>(false, FormValidators.Required),
  };
}

@Injectable()
export class LoginFormService extends FormBase<LoginForm> {
  public constructor() {
    super(getLoginForm());
  }

  public resetForm(): void {
    this.controls.password.reset();
  }
}

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginFormComponent implements LoginFormComponentInput, LoginFormComponentOutput {
  @Input() public title = 'Welcome back!';
  @Input() public subtitle = 'Please sign in to continue.';
  @Input() public saveText = 'Sign in';

  @Output() saveClicked = new EventEmitter<FormBase<LoginForm>>();

  public readonly form: FormBase<LoginForm> =
    this._loginFormService ?? new FormBase<LoginForm>(getLoginForm());

  @ViewChild(TextFieldComponent) private readonly _usernameRef?: TextFieldComponent;
  @ViewChild(PasswordFieldComponent) private readonly _passwordRef?: PasswordFieldComponent;
  @HostBinding('class') private _classes = 'block col-12 col-md-10 m-auto';

  public constructor(
    @SkipSelf() @Optional() private readonly _loginFormService: LoginFormService | null
  ) {}

  public get formGroup(): FormGroup<LoginForm> {
    return this.form;
  }

  public onLogin(): void {
    this.saveClicked.emit(this.form);
  }

  public focus(fieldName: 'username' | 'password', options?: FocusOptions): void {
    if (fieldName === 'username' && this._usernameRef) {
      this._usernameRef.focus(options);
      return;
    }

    if (fieldName === 'password' && this._passwordRef) {
      this._passwordRef.focus(options);
    }
  }
}
