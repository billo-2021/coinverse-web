import { ChangeDetectionStrategy, Component, HostBinding, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PasswordResetService } from '../../../../common/domain-services';
import { PasswordResetTokenRequest } from '../../../../common/domain-models';
import { finalize, tap } from 'rxjs';
import { AlertService } from '../../../../core/services';

type StateType = 'error' | 'normal' | 'pass';

type StepState = {
  state: StateType;
  isDisabled: boolean;
};

type StepType = {
  title: string;
} & StepState;

enum Steps {
  PASSWORD_REQUEST,
  PASSWORD_RESULT,
}

@Component({
  selector: 'app-reset-password-request',
  templateUrl: './reset-password-request.component.html',
  styleUrls: ['./reset-password-request.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ResetPasswordRequestComponent {
  @HostBinding('class') public classes = 'full-width flex-col justify-center items-center';
  protected readonly STEPS = Steps;
  protected readonly DEFAULT_STEP_STATE: StepState = {
    state: 'normal',
    isDisabled: true,
  };
  protected readonly MESSAGING_CHANNEL = 'email';
  protected readonly MAX_NUMBER_OF_STEPS = 2;
  protected currentStepIndex = 0;
  protected steps: StepType[];

  protected readonly resetPasswordRequestForm: FormGroup;
  protected passwordLinkRecipient: string | null = null;
  protected username: string | null = null;

  public constructor(
    private readonly alertService: AlertService,
    private readonly formBuilder: FormBuilder,
    private passwordResetService: PasswordResetService
  ) {
    this.resetPasswordRequestForm = formBuilder.group({
      username: ['', [Validators.required, Validators.email]],
    });

    this.steps = this.getSteps();
  }

  public getSteps(): StepType[] {
    return [
      {title: 'Forgot password', ...this.DEFAULT_STEP_STATE},
      {title: 'Reset validation', ...this.DEFAULT_STEP_STATE},
    ];
  }

  public onStepChanged(nextStep: number): void {
    if (nextStep !== Steps.PASSWORD_RESULT) {
      this.resetForm();
      this.currentStepIndex = nextStep;
      return;
    }

    this.onRequestPasswordReset();
  }

  public onRequestPasswordReset(): void {
    const resetPasswordFormValue = this.resetPasswordRequestForm.value;

    const username: string = resetPasswordFormValue.username;
    this.username = username;
    const resetPasswordRequest: PasswordResetTokenRequest = {
      username,
      messagingChannel: this.MESSAGING_CHANNEL,
    };

    this.passwordResetService
      .requestPasswordResetToken(resetPasswordRequest)
      .pipe(
        tap((response) => {
          this.alertService.showMessage('Password reset sent');
          this.passwordLinkRecipient = response.emailAddress;
        }),
        finalize(() => {
          this.currentStepIndex = Steps.PASSWORD_RESULT;
        })
      )
      .subscribe();
  }

  public resetForm(): void {
    this.username = null;
    this.passwordLinkRecipient = null;
    this.resetPasswordRequestForm.controls['username'].setValue('');
    this.resetPasswordRequestForm.markAsUntouched();
  }
}
