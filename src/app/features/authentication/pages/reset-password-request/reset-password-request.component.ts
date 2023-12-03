import {
  ChangeDetectionStrategy,
  Component,
  HostBinding,
  Inject,
  Self,
  ViewEncapsulation,
} from '@angular/core';
import { FormGroup } from '@angular/forms';
import { PasswordResetService } from '../../../../common/domain-services';
import { PasswordResetTokenRequest } from '../../../../common/domain-models';
import { Subject } from 'rxjs';
import { ResetPasswordRequestFormService } from '../../services/reset-password-request-form.service';
import { ResetPasswordRequestForm } from '../../models';
import { ApiError } from '../../../../core/models';
import { apiErrorCodes } from '../../../../common/constants';
import { messagingChannelToken } from '../../../../core/config';
import { MessagingChannel } from '../../../../core/types';
import { AlertService } from '../../../../core/services';

enum Steps {
  PASSWORD_REQUEST,
  PASSWORD_RESULT,
}

@Component({
  selector: 'app-reset-password-request',
  templateUrl: './reset-password-request.component.html',
  styleUrls: ['./reset-password-request.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [ResetPasswordRequestFormService],
})
export class ResetPasswordRequestComponent {
  protected readonly STEPS = Steps;
  protected readonly messagingChannel: MessagingChannel;
  protected readonly MAX_NUMBER_OF_STEPS = 2;
  protected currentStepIndex: Steps = 0;
  protected readonly steps = ['Forgot password', 'Password reset'];
  protected readonly resetPasswordRequestForm: FormGroup<ResetPasswordRequestForm>;
  protected readonly formError$ = new Subject<string>();
  protected passwordLinkRecipient = '';
  @HostBinding('class') private _classes = 'block max-w-md m-auto';

  public constructor(
    @Self() private readonly _resetPasswordRequestForm$: ResetPasswordRequestFormService,
    private _passwordResetService: PasswordResetService,
    @Inject(messagingChannelToken) private readonly _messagingChannelToken: MessagingChannel,
    private readonly _alertService: AlertService
  ) {
    this.resetPasswordRequestForm = _resetPasswordRequestForm$.value;
    this.messagingChannel = _messagingChannelToken;
  }

  public onStepChanged(nextStep: number): void {
    if (!this.isSteps(nextStep)) {
      return;
    }

    this.currentStepIndex = nextStep;
  }

  public onRequestPasswordReset(): void {
    this.formError$.next('');
    const resetPasswordFormValue = this.resetPasswordRequestForm.getRawValue();

    const username: string = resetPasswordFormValue.username;

    const resetPasswordRequest: PasswordResetTokenRequest = {
      username,
      messagingChannel: this.messagingChannel,
    };

    this._passwordResetService.requestPasswordResetToken(resetPasswordRequest).subscribe({
      next: (response) => {
        this._alertService.showMessage('Password reset sent');
        this.passwordLinkRecipient = response.emailAddress;
        this.currentStepIndex = Steps.PASSWORD_RESULT;
      },
      error: (error) => {
        this.resetForm();
        if (error instanceof ApiError && error.code === apiErrorCodes.VALIDATION_ERROR) {
          this.formError$.next(`We were unable to find an account linked to ${username}`);
          return;
        }

        throw error;
      },
    });
  }

  public resetForm(): void {
    this.passwordLinkRecipient = '';
    this.resetPasswordRequestForm.controls.username.reset();
    this.resetPasswordRequestForm.markAsUntouched();
  }

  private isSteps(step: number): step is Steps {
    return step >= Steps.PASSWORD_REQUEST && step <= Steps.PASSWORD_RESULT;
  }
}
