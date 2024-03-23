import {
  ChangeDetectionStrategy,
  Component,
  HostBinding,
  Inject,
  Self,
  ViewEncapsulation,
} from '@angular/core';
import { BehaviorSubject, combineLatest, map, Observable } from 'rxjs';
import {
  AlertService,
  ApiError,
  apiErrorCodes,
  AUTH_CONFIG_TOKEN,
  AuthConfig,
  FormBase,
  MessagingChannel,
  View,
} from '../../../../shared';
import { PasswordResetService, PasswordResetTokenRequest } from '../../../../domain';
import { ResetPasswordRequestForm, ResetPasswordRequestFormService } from '../../components';

export enum ResetPasswordRequestFormStep {
  PasswordRequest,
  PasswordResult,
}

export type ResetPasswordFormStepType = typeof ResetPasswordRequestFormStep;
export type ResetPasswordFormStepsType = readonly [string, string];

export interface ResetPasswordRequestViewModel {
  readonly currentStepIndex: ResetPasswordRequestFormStep;
  readonly passwordLinkRecipient: string;
  readonly formError: string | null;
}

export interface ResetPasswordRequestView extends View<ResetPasswordRequestViewModel> {
  readonly ResetPasswordFormStepType: ResetPasswordFormStepType;
  readonly ResetPasswordFormSteps: ResetPasswordFormStepsType;
  readonly messagingChannel: MessagingChannel;
}

export const RESET_PASSWORD_FORM_STEPS: ResetPasswordFormStepsType = [
  'Forgot password',
  'Password reset',
];

@Component({
  selector: 'app-reset-password-request',
  templateUrl: './reset-password-request.component.html',
  styleUrls: ['./reset-password-request.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [ResetPasswordRequestFormService],
})
export class ResetPasswordRequestComponent implements ResetPasswordRequestView {
  public readonly ResetPasswordFormStepType: ResetPasswordFormStepType =
    ResetPasswordRequestFormStep;
  public readonly ResetPasswordFormSteps: ResetPasswordFormStepsType = RESET_PASSWORD_FORM_STEPS;
  public readonly messagingChannel: MessagingChannel = this._authConfig.messagingChannel;
  protected readonly resetPasswordRequestForm: FormBase<ResetPasswordRequestForm> =
    this._resetPasswordRequestForm;
  @HostBinding('class') private _classes = 'block max-w-md m-auto';
  private readonly _currentStepIndex$ = new BehaviorSubject<ResetPasswordRequestFormStep>(
    ResetPasswordRequestFormStep.PasswordRequest
  );

  private readonly _passwordLinkRecipient$ = new BehaviorSubject<string>('');

  private readonly _formError$ = new BehaviorSubject<string | null>(null);

  public readonly viewModel$: Observable<ResetPasswordRequestViewModel> = combineLatest([
    this._currentStepIndex$,
    this._passwordLinkRecipient$,
    this._formError$,
  ]).pipe(
    map(([currentStepIndex, passwordLinkRecipient, formError]) => ({
      currentStepIndex,
      passwordLinkRecipient,
      formError,
    }))
  );

  public constructor(
    @Self() private readonly _resetPasswordRequestForm: ResetPasswordRequestFormService,
    @Inject(AUTH_CONFIG_TOKEN) private readonly _authConfig: AuthConfig,
    private readonly _passwordResetService: PasswordResetService,
    private readonly _alertService: AlertService
  ) {}

  public set currentStepIndex(value: ResetPasswordRequestFormStep) {
    this._currentStepIndex$.next(value);
  }

  public set passwordLinkRecipient(value: string) {
    this._passwordLinkRecipient$.next(value);
  }

  public set formError(value: string | null) {
    this._formError$.next(value);
  }

  public onStepChanged(nextStep: number): void {
    if (!this.isSteps(nextStep)) {
      return;
    }

    this.currentStepIndex = nextStep;
  }

  public onRequestPasswordReset(): void {
    this.formError = '';
    const resetPasswordFormModel = this.resetPasswordRequestForm.getModel();
    const username: string = resetPasswordFormModel.username;

    const resetPasswordRequest: PasswordResetTokenRequest = {
      username,
      messagingChannel: this.messagingChannel,
    };

    this._passwordResetService.requestPasswordResetToken(resetPasswordRequest).subscribe({
      next: (response) => {
        this._alertService.showMessage('Password reset sent');
        this.passwordLinkRecipient = response.emailAddress;
        this.currentStepIndex = ResetPasswordRequestFormStep.PasswordResult;
      },
      error: (error) => {
        this.resetForm();
        if (error instanceof ApiError && error.code === apiErrorCodes.VALIDATION_ERROR) {
          this.formError = `We were unable to find an account linked to ${username}`;
          return;
        }

        throw error;
      },
    });
  }

  public resetForm(): void {
    this.passwordLinkRecipient = '';
    this._resetPasswordRequestForm.resetForm();
  }

  private isSteps(step: number): step is ResetPasswordRequestFormStep {
    return (
      step >= ResetPasswordRequestFormStep.PasswordRequest &&
      step <= ResetPasswordRequestFormStep.PasswordResult
    );
  }
}
