import {
  ChangeDetectionStrategy,
  Component,
  HostBinding,
  Inject,
  OnInit,
  ViewEncapsulation
} from '@angular/core';

import { AuthenticationService } from '../../../../common/domain-services';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginRequest } from '../../../../common/domain-models';
import { filter, finalize, tap } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { webRoutesConfig } from '../../../../common/config/web-routes-config';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginComponent implements OnInit {
  @HostBinding('class') public classes = 'full-width flex-col justify-center items-center';
  protected readonly loginForm: FormGroup;
  private _redirectUrl?: string;

  public constructor(
    @Inject(ActivatedRoute) private readonly _route: ActivatedRoute,
    @Inject(FormBuilder) private readonly formBuilder: FormBuilder,
    @Inject(Router) private readonly router: Router,
    @Inject(AuthenticationService)
    private readonly authenticationService: AuthenticationService
  ) {
    this.loginForm = formBuilder.group({
      username: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
  }

  public ngOnInit(): void {
    this._route.queryParams
      .pipe(
        filter((params) => params['redirectUrl']),
        tap((params) => (this._redirectUrl = params['redirectUrl']))
      )
      .subscribe();
  }

  public onLogin(): void {
    const loginFormValue: unknown | LoginRequest = this.loginForm.value;

    if (!this.isLoginRequest(loginFormValue)) {
      return;
    }

    this.authenticationService
      .login(loginFormValue)
      .pipe(
        finalize(() => {
          this.resetForm();
        }),
        tap(() => {
          if (this._redirectUrl) {
            this.router.navigate([this._redirectUrl]).then();
            return;
          }

          this.router.navigate([webRoutesConfig.root]).then();
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
