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

import { finalize, Subject, timer } from 'rxjs';

import { ApiError } from '../../../../core';
import { AuthenticationService } from '../../../../common';
import { LoginRequest } from '../../../../common/domain-models/authentication';

import { PasswordFieldComponent, TextFieldComponent } from '../../../../form-components';

import { LoginForm } from '../../models';
import { LoginFormService } from '../../services';
import { FormGroup } from '@angular/forms';

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
    @Self() private readonly _loginForm: LoginFormService,
    private readonly _changeDetectorRef: ChangeDetectorRef,
    private readonly _authenticationService: AuthenticationService
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
