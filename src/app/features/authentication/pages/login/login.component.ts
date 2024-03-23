import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  HostBinding,
  Self,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import { finalize, Subject, timer } from 'rxjs';
import { ErrorUtils, FormBase } from '../../../../shared';
import { AuthenticationService, LoginRequest } from '../../../../domain';
import { LoginForm, LoginFormComponent, LoginFormService } from '../../components';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [LoginFormService],
})
export class LoginComponent {
  protected readonly formError$ = new Subject<string>();
  protected readonly loginForm: FormBase<LoginForm> = this._loginForm;
  @HostBinding('class') private _classes = 'block';
  @ViewChild(LoginFormComponent) private _loginFormRef?: LoginFormComponent;

  public constructor(
    @Self() private readonly _loginForm: LoginFormService,
    private readonly _changeDetectorRef: ChangeDetectorRef,
    private readonly _authenticationService: AuthenticationService
  ) {}

  public onLogin(): void {
    this.formError$.next('');
    const loginFormModel = this.loginForm.getModel();

    const loginRequest: LoginRequest = {
      username: loginFormModel.username,
      password: loginFormModel.password,
    };

    this._authenticationService
      .login(loginRequest)
      .pipe(
        finalize(() => {
          this._loginForm.resetForm();

          timer(0).subscribe(() => {
            this._loginFormRef?.focus('password');
          });
        })
      )
      .subscribe({
        error: (error) => this.formError$.next(ErrorUtils.getErrorMessage(error)),
      });
  }
}
