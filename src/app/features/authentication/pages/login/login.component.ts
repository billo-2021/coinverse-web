import {ChangeDetectionStrategy, Component, OnInit, ViewEncapsulation} from '@angular/core';

import {AuthenticationService} from "../../../../common/domain-services";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {LoginRequest} from "../../../../common/domain-models";
import {finalize, tap} from "rxjs";
import {Router} from "@angular/router";
import {webRoutesConfig} from "../../../../common/config/web-routes-config";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {'class': 'full-width flex-col justify-center items-center'}
})
export class LoginComponent implements OnInit {
  protected readonly loginForm: FormGroup;

  public constructor(private formBuilder: FormBuilder,
                     private readonly router: Router,
                     private authenticationService: AuthenticationService) {

    this.loginForm = formBuilder.group({
      username: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });
  }

  public ngOnInit(): void {
  }

  public onLogin(): void {
    const loginFormValue: unknown | LoginRequest = this.loginForm.value;

    if (!this.isLoginRequest(loginFormValue)) {
      return;
    }

    this.authenticationService.login(loginFormValue)
      .pipe(finalize(() => {
        this.resetForm();

      }), tap(async () => {
        await this.router.navigate([webRoutesConfig.root]);
      }))
      .subscribe();
  }

  private isLoginRequest(value: unknown): value is LoginRequest {
    return (value != null && typeof value === 'object'
      && 'username' in value && typeof value.username === 'string'
      && 'password' in value && typeof value.password === 'string');
  }

  private resetForm(): void {
    this.loginForm.controls['password'].setValue('');
    this.loginForm.markAsUntouched();
  }
}
