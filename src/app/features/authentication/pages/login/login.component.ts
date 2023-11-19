import { ChangeDetectionStrategy, Component, HostBinding, ViewEncapsulation } from '@angular/core';

import { AuthenticationService } from '../../../../common/domain-services';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginRequest } from '../../../../common/domain-models';
import { finalize } from 'rxjs';
import { AlertService } from '../../../../core/services';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent {
  @HostBinding('class') public classes = 'full-width flex-col justify-center items-center';
  protected readonly loginForm: FormGroup;

  public constructor(
    private readonly _formBuilder: FormBuilder,
    private readonly _authenticationService: AuthenticationService,
    private readonly _alertService: AlertService
  ) {
    this.loginForm = _formBuilder.group({
      username: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
  }

  public onLogin(): void {
    const loginFormValue: unknown | LoginRequest = this.loginForm.value;

    if (!this.isLoginRequest(loginFormValue)) {
      this._alertService.showErrorMessage('Invalid login credentials provided');
      this.resetForm();
      return;
    }

    this._authenticationService
      .login(loginFormValue)
      .pipe(
        finalize(() => {
          this.resetForm();
        })
      )
      .subscribe();
  }

  private isLoginRequest(value: unknown): value is LoginRequest {
    return (
      value != null &&
      typeof value === 'object' &&
      'username' in value &&
      typeof value.username === 'string' &&
      'password' in value &&
      typeof value.password === 'string'
    );
  }

  private resetForm(): void {
    this.loginForm.controls['password'].setValue('');
    this.loginForm.markAsUntouched();
  }
}
