import {
  ChangeDetectionStrategy,
  Component,
  HostBinding,
  OnInit,
  Self,
  ViewEncapsulation,
} from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { finalize, map, Subject, switchMap, take, tap } from 'rxjs';

import { ApiError } from '../../../../core/models';
import { AlertService, NavigationService } from '../../../../core/services';
import {
  PasswordResetService,
  PasswordTokenUserResponse,
  ResetPasswordRequest,
} from '../../../../common';

import { ResetPasswordFormService } from '../../services/reset-password-form.service';
import { ResetPasswordForm } from '../../models';

enum Steps {
  PASSWORD_RESET,
  PASSWORD_RESET_RESULT,
}

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [ResetPasswordFormService],
})
export class ResetPasswordComponent implements OnInit {
  @HostBinding('class') public classes = 'block max-w-md m-auto';
  protected readonly STEPS = Steps;
  protected currentStepIndex: Steps = Steps.PASSWORD_RESET;
  protected readonly steps = ['Set a new Password', 'Reset password result'];

  protected readonly formError$ = new Subject<string>();
  protected readonly resetPasswordForm: FormGroup<ResetPasswordForm>;
  protected passwordLinkToken = '';

  protected passwordTokenUser: PasswordTokenUserResponse | null = null;

  public constructor(
    private readonly _alertService: AlertService,
    private readonly _activatedRoute: ActivatedRoute,
    private readonly _navigationService: NavigationService,
    @Self() private readonly _resetPasswordForm$: ResetPasswordFormService,
    private readonly _passwordResetService: PasswordResetService
  ) {
    this.resetPasswordForm = _resetPasswordForm$.value;
  }

  ngOnInit() {
    const passwordLinkToken$ = this._activatedRoute.params.pipe(
      take(1),
      map((params) => {
        const passwordToken = params['passwordToken'] as string | undefined;

        if (!passwordToken) {
          const message = 'Invalid password link';
          throw new Error(message);
        }

        return passwordToken;
      }),
      tap((passwordLinkToken) => (this.passwordLinkToken = passwordLinkToken))
    );

    passwordLinkToken$
      .pipe(
        switchMap((passwordToken) =>
          this._passwordResetService.requestPasswordTokenUser(passwordToken)
        )
      )
      .subscribe({
        next: (passwordTokenUserResponse) => {
          this.passwordTokenUser = passwordTokenUserResponse;
        },
        error: (error) => {
          if (typeof error === 'string') {
            this._alertService.showErrorMessage(error);
            this._navigationService.to('login').then();
            return;
          }

          this._navigationService.to('login').then();
          throw error;
        },
      });
  }

  public onStepChanged(nextStep: number): void {
    if (!this.isSteps(nextStep)) {
      return;
    }

    this.currentStepIndex = nextStep;
  }

  public onResetPassword() {
    this.formError$.next('');

    if (!this.passwordTokenUser) {
      return;
    }

    const resetPasswordFormValue = this.resetPasswordForm.getRawValue();
    const password = resetPasswordFormValue.password;

    const resetPasswordRequest: ResetPasswordRequest = {
      username: this.passwordTokenUser.username,
      token: this.passwordLinkToken,
      password: password,
    };

    this._passwordResetService
      .resetPassword(resetPasswordRequest)
      .pipe(finalize(() => this.resetForm()))
      .subscribe({
        next: () => {
          this.currentStepIndex = Steps.PASSWORD_RESET_RESULT;
        },
        error: (error) => {
          if (error instanceof ApiError) {
            this.formError$.next(error.message);
            return;
          }

          throw error;
        },
      });
  }

  public resetForm(): void {
    this.resetPasswordForm.controls['password'].setValue('');
    this.resetPasswordForm.markAsUntouched();
  }

  private isSteps(step: number): step is Steps {
    return step >= Steps.PASSWORD_RESET && step <= Steps.PASSWORD_RESET_RESULT;
  }
}
