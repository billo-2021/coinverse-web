import {
  ChangeDetectionStrategy,
  Component,
  HostBinding,
  Self,
  ViewEncapsulation,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {
  BehaviorSubject,
  catchError,
  combineLatest,
  filter,
  finalize,
  map,
  merge,
  Observable,
  startWith,
  switchMap,
  tap,
  throwError,
} from 'rxjs';
import { tuiIsPresent } from '@taiga-ui/cdk';
import {
  AlertService,
  AppError,
  ErrorUtils,
  FormBase,
  NavigationController,
  ParamsService,
  View,
  WebRoute,
} from '../../../../shared';
import { PasswordResetService, PasswordTokenUser, ResetPasswordRequest } from '../../../../domain';
import { ResetPasswordForm, ResetPasswordFormService } from '../../components';

export enum ResetPasswordFormStep {
  PasswordReset,
  PasswordResetResult,
}

export type ResetPasswordFormStepType = typeof ResetPasswordFormStep;
export type ResetPasswordFormStepsType = readonly [string, string];

export interface ResetPasswordViewModel {
  readonly currentStepIndex: ResetPasswordFormStep;
  readonly passwordLinkToken: string | null;
  readonly passwordTokenUser: PasswordTokenUser | null;
  readonly formError: string | null;
}

export interface ResetPasswordView extends View<ResetPasswordViewModel> {
  readonly ResetPasswordFormStepType: ResetPasswordFormStepType;
  readonly ResetPasswordFormSteps: ResetPasswordFormStepsType;
}

export const RESET_PASSWORD_FORM_STEPS: ResetPasswordFormStepsType = [
  'Set a new Password',
  'Reset password result',
];

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [ResetPasswordFormService, ParamsService],
})
export class ResetPasswordComponent implements ResetPasswordView {
  @HostBinding('class') public classes = 'block max-w-md m-auto';

  public readonly ResetPasswordFormStepType: ResetPasswordFormStepType = ResetPasswordFormStep;
  public readonly ResetPasswordFormSteps: ResetPasswordFormStepsType = RESET_PASSWORD_FORM_STEPS;

  protected readonly resetPasswordForm: FormBase<ResetPasswordForm> = this._resetPasswordForm;

  private readonly _currentStepIndex$ = new BehaviorSubject<ResetPasswordFormStep>(
    ResetPasswordFormStep.PasswordReset
  );

  private readonly _passwordLinkToken$ = new BehaviorSubject<string | null>(null);
  private readonly _passwordTokenUser$ = new BehaviorSubject<PasswordTokenUser | null>(null);
  private readonly _formError$ = new BehaviorSubject<string | null>(null);

  private readonly _effects$ = merge(
    this._paramsService.param('passwordToken').pipe(
      tap((passwordToken) => {
        if (!passwordToken) {
          const message = 'Password token must be provided';
          throw new AppError(message);
        }

        this._passwordLinkToken$.next(passwordToken);
      })
    ),
    this._passwordLinkToken$.pipe(
      filter(tuiIsPresent),
      switchMap((passwordLinkToken) =>
        this._passwordResetService
          .requestPasswordTokenUser(passwordLinkToken)
          .pipe(startWith<PasswordTokenUser | null>(null))
      ),
      catchError(() => {
        const message = 'Invalid password token';
        this._navigationService.to(WebRoute.LOGIN).then();
        return throwError(() => new AppError(message));
      }),
      tap((passwordTokenUser) => this._passwordTokenUser$.next(passwordTokenUser))
    )
  );

  public readonly viewModel$: Observable<ResetPasswordViewModel> = combineLatest([
    this._currentStepIndex$,
    this._passwordLinkToken$,
    this._passwordTokenUser$,
    this._formError$,
    this._effects$,
  ]).pipe(
    map(([currentStepIndex, passwordLinkToken, passwordTokenUser, formError]) => ({
      currentStepIndex,
      passwordLinkToken,
      passwordTokenUser,
      formError,
    }))
  );

  public constructor(
    private readonly _paramsService: ParamsService,
    private readonly _alertService: AlertService,
    private readonly _activatedRoute: ActivatedRoute,
    private readonly _navigationService: NavigationController,
    @Self() private readonly _resetPasswordForm: ResetPasswordFormService,
    private readonly _passwordResetService: PasswordResetService
  ) {}

  public set currentStepIndex(value: ResetPasswordFormStep) {
    this._currentStepIndex$.next(value);
  }

  public set formError(value: string | null) {
    this._formError$.next(value);
  }

  public get passwordTokenUser(): PasswordTokenUser | null {
    return this._passwordTokenUser$.value;
  }

  public get passwordLinkToken(): string | null {
    return this._passwordLinkToken$.value;
  }

  public onStepChanged(nextStep: number): void {
    if (!this.isSteps(nextStep)) {
      return;
    }

    this.currentStepIndex = nextStep;
  }

  public onResetPassword() {
    this.formError = '';
    const passwordLLinkToken = this.passwordLinkToken;
    const passwordTokenUser = this.passwordTokenUser;

    if (!passwordLLinkToken || !passwordTokenUser) {
      return;
    }

    const resetPasswordFormModel = this.resetPasswordForm.getModel();

    const resetPasswordRequest: ResetPasswordRequest = {
      username: passwordTokenUser.username,
      token: passwordLLinkToken,
      password: resetPasswordFormModel.password,
    };

    this._passwordResetService
      .resetPassword(resetPasswordRequest)
      .pipe(finalize(() => this._resetPasswordForm.resetForm()))
      .subscribe({
        next: () => (this.currentStepIndex = ResetPasswordFormStep.PasswordResetResult),
        error: (error) => (this.formError = ErrorUtils.getErrorMessage(error)),
      });
  }

  private isSteps(step: number): step is ResetPasswordFormStep {
    return (
      step >= ResetPasswordFormStep.PasswordReset &&
      step <= ResetPasswordFormStep.PasswordResetResult
    );
  }
}
