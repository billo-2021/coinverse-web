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
import { FormBase, Required, RequiredEmail } from '../../../../common';
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
    username: new FormControl<string>('', RequiredEmail),
    password: new FormControl<string>('', Required),
    rememberMe: new FormControl<boolean>(false, Required),
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
export class LoginFormComponent
  implements LoginFormComponentInput, LoginFormComponentOutput, AfterViewInit
{
  @Input() public title = 'Welcome back!';
  @Input() public subtitle = 'Please sign in to continue.';
  @Input() public saveText = 'Sign in';

  @Output() saveClicked = new EventEmitter<FormBase<LoginForm>>();

  public readonly form: FormBase<LoginForm> =
    this._loginFormService ?? new FormBase<LoginForm>(getLoginForm());

  @ViewChild(TextFieldComponent) public readonly usernameRef?: TextFieldComponent;
  @ViewChild(PasswordFieldComponent) public readonly passwordRef?: PasswordFieldComponent;
  @HostBinding('class') private _classes = 'block col-12 col-md-10 m-auto';

  public constructor(
    @SkipSelf() @Optional() private readonly _loginFormService: LoginFormService | null,
    private readonly _changeDetectorRef: ChangeDetectorRef
  ) {}

  public get formGroup(): FormGroup<LoginForm> {
    return this.form;
  }

  public ngAfterViewInit() {
    this.usernameRef?.focusInput(false);
    this._changeDetectorRef.detectChanges();
  }

  public onLogin(): void {
    this.saveClicked.emit(this.form);
  }
}
