import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  HostBinding,
  Self,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { finalize, Subject, timer } from 'rxjs';

import { AlertService, ApiError } from '../../../../core';
import { AuthenticationService } from '../../../../common';
import { LoginRequest } from '../../../../common/domain-models/authentication';

import { TextFieldComponent } from '../../../../form-components/components/text-field/text-field.component';
import { PasswordFieldComponent } from '../../../../form-components/components/password-field/password-field.component';

import { LoginForm } from '../../models';
import { LoginFormService } from '../../services';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [LoginFormService],
})
export class LoginComponent implements AfterViewInit {
  protected readonly loginForm: FormGroup<LoginForm>;
  protected readonly formError$ = new Subject<string>();
  @HostBinding('class') private _classes = 'block col-12 col-md-10 m-auto';
  @ViewChild(TextFieldComponent) private _usernameRef?: TextFieldComponent;
  @ViewChild(PasswordFieldComponent) private _passwordRef?: PasswordFieldComponent;

  public constructor(
    private readonly _formBuilder: FormBuilder,
    @Self() private readonly _loginForm: LoginFormService,
    private readonly _changeDetectorRef: ChangeDetectorRef,
    private readonly _authenticationService: AuthenticationService,
    private readonly _alertService: AlertService
  ) {
    this.loginForm = _loginForm.value;
  }

  public ngAfterViewInit() {
    this._usernameRef?.focusInput(false);
    this._changeDetectorRef.detectChanges();
  }

  public onLogin(): void {
    this.formError$.next('');
    const loginFormValue = this.loginForm.getRawValue();

    const loginRequest: LoginRequest = {
      username: loginFormValue.username,
      password: loginFormValue.password,
    };

    this._authenticationService
      .login(loginRequest)
      .pipe(
        finalize(() => {
          this.resetForm();

          timer(0).subscribe(() => {
            this._passwordRef?.focusInput(false);
            this._changeDetectorRef.detectChanges();
          });
        })
      )
      .subscribe({
        error: (error) => {
          if (error instanceof ApiError) {
            this.formError$.next(error.message);
            return;
          }

          throw error;
        },
      });
  }

  private resetForm(): void {
    this.loginForm.controls.password.reset();
  }
}
