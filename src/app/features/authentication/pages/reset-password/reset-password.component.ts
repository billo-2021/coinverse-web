import { ChangeDetectionStrategy, Component, HostBinding, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { finalize, map, switchMap, take } from 'rxjs';
import { AlertService, NavigationService } from '../../../../core/services';
import { PasswordResetService } from '../../../../common/domain-services';
import { PasswordTokenUserResponse, ResetPasswordRequest } from '../../../../common/domain-models';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { webRoutesConfig } from '../../../../common/config/web-routes-config';

type StateType = 'error' | 'normal' | 'pass';

type StepState = {
  state: StateType;
  isDisabled: boolean;
};

type StepType = {
  title: string;
} & StepState;

enum Steps {
  PASSWORD_RESET,
  PASSWORD_RESET_RESULT,
}

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ResetPasswordComponent implements OnInit {
  @HostBinding('class') public classes = 'full-width flex-col justify-center items-center';
  protected readonly STEPS = Steps;
  protected readonly DEFAULT_STEP_STATE: StepState = {
    state: 'normal',
    isDisabled: true,
  };
  protected currentStepIndex = 0;
  protected readonly steps: StepType[];

  protected readonly resetPasswordForm: FormGroup;
  protected passwordLinkToken?: string;

  protected isLoading = false;
  protected passwordTokenUser?: PasswordTokenUserResponse;

  public constructor(
    private readonly alertService: AlertService,
    private readonly activatedRoute: ActivatedRoute,
    private readonly navigationService: NavigationService,
    private readonly formBuilder: FormBuilder,
    private readonly passwordResetService: PasswordResetService
  ) {
    this.resetPasswordForm = formBuilder.group({
      password: ['', [Validators.required]],
    });

    this.steps = this.getSteps();
  }

  ngOnInit(): void {
    this.isLoading = true;

    this.activatedRoute.params
      .pipe(
        take(1),
        map((params) => {
          const passwordToken = params['passwordToken'] as string;

          if (!passwordToken) {
            const message = 'Invalid password link';
            this.alertService.showErrorMessage(message);
            throw new Error(message);
          }

          this.passwordLinkToken = passwordToken;

          return passwordToken;
        }),
        switchMap((passwordToken) => this.passwordResetService.requestPasswordTokenUser(passwordToken)),
        finalize(() => {
          this.isLoading = false;
        })
      )
      .subscribe({
        next: (response) => {
          this.passwordTokenUser = response;
        },
        error: async () => {
          await this.navigationService.to({
            path: webRoutesConfig.authentication.login,
          });
        },
      });
  }

  public getSteps(): StepType[] {
    return [
      {title: 'Set a new Password', ...this.DEFAULT_STEP_STATE},
      {title: 'Reset password result', ...this.DEFAULT_STEP_STATE},
    ];
  }

  public onStepChanged(nextStep: number): void {
    this.currentStepIndex = nextStep;
  }

  public onResetPassword() {
    if (!this.passwordTokenUser || !this.passwordLinkToken) {
      return;
    }

    const resetPasswordFormValue = this.resetPasswordForm.value;
    const password = resetPasswordFormValue.password as string;

    const resetPasswordRequest: ResetPasswordRequest = {
      username: this.passwordTokenUser.username,
      token: this.passwordLinkToken,
      password: password,
    };

    this.passwordResetService
      .resetPassword(resetPasswordRequest)
      .pipe(finalize(() => this.resetForm()))
      .subscribe((response) => {
        this.alertService.showMessage(response.message);
        this.currentStepIndex = Steps.PASSWORD_RESET_RESULT;
      });
  }

  public resetForm(): void {
    this.resetPasswordForm.controls['password'].setValue('');
    this.resetPasswordForm.markAsUntouched();
  }
}
