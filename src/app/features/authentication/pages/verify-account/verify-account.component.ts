import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  HostBinding,
  Inject,
  Self,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import { BehaviorSubject, combineLatest, finalize, map, Observable, tap } from 'rxjs';
import {
  AccountVerification,
  AccountVerificationStore,
  AlertService,
  AUTH_CONFIG_TOKEN,
  AuthConfig,
  ErrorUtils,
  FormBase,
  MessagingChannel,
  NavigationController,
  View,
  WebRoute,
} from '../../../../shared';
import {
  AccountVerificationService,
  OtpTokenRequest,
  VerifyAccountRequest,
} from '../../../../domain';
import { OtpForm, OtpFormComponent, OtpFormService } from '../../components';

export interface VerifyAccountViewModel {
  readonly otpRecipient: string;
  readonly formError: string | null;
}

@Component({
  selector: 'app-verify-account',
  templateUrl: './verify-account.component.html',
  styleUrls: ['./verify-account.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [OtpFormService],
})
export class VerifyAccountComponent implements View<VerifyAccountViewModel>, AfterViewInit {
  protected readonly verificationMethod: MessagingChannel = this._authConfig.verificationMethod;
  protected readonly otpForm: FormBase<OtpForm> = this._otpFormService;

  @HostBinding('class') private _classes = 'block col-12 col-md-10 m-auto';

  @ViewChild('otpFormRef') private otpFormRef?: OtpFormComponent;

  private readonly _otpRecipient$ = new BehaviorSubject<string>('');

  private readonly _accountVerification$: Observable<AccountVerification | null> =
    this._accountVerificationStore$.pipe(
      tap((accountVerification) => {
        if (!accountVerification) {
          this._navigationService.to(WebRoute.ROOT).then();
          return;
        }

        this.otpRecipient = accountVerification.username;
      })
    );

  private readonly _formError$ = new BehaviorSubject<string | null>(null);

  public readonly viewModel$: Observable<VerifyAccountViewModel> = combineLatest([
    this._otpRecipient$,
    this._formError$,
    this._accountVerification$,
  ]).pipe(map(([otpRecipient, formError]) => ({ otpRecipient, formError })));

  public constructor(
    private readonly _changeDetectorRef: ChangeDetectorRef,
    @Inject(AUTH_CONFIG_TOKEN) private readonly _authConfig: AuthConfig,
    @Self() private readonly _otpFormService: OtpFormService,
    private readonly _navigationService: NavigationController,
    private readonly _accountVerificationService: AccountVerificationService,
    private readonly _accountVerificationStore$: AccountVerificationStore,
    private readonly _alertService: AlertService
  ) {}

  public set formError(value: string | null) {
    this._formError$.next(value);
  }

  public get otpRecipient(): string {
    return this._otpRecipient$.value;
  }

  public set otpRecipient(value: string) {
    this._otpRecipient$.next(value);
  }

  public ngAfterViewInit(): void {
    if (!this.otpFormRef) {
      return;
    }

    this.otpFormRef.focus(0);
    this._changeDetectorRef.detectChanges();
  }

  public onSubmitOtp(): void {
    this.formError = '';
    const otp = this.otpForm.getModel().otp;
    const otpRecipient = this.otpRecipient;

    const verifyAccountRequest: VerifyAccountRequest = {
      username: otpRecipient,
      token: otp,
    };

    this._accountVerificationService
      .verifyAccount(verifyAccountRequest)
      .pipe(finalize(() => this.resetOtpForm()))
      .subscribe({
        next: (response) => this._alertService.showMessage(response.message),
        error: (error) => (this.formError = ErrorUtils.getErrorMessage(error)),
      });
  }

  public onResendOtp(): void {
    const otpRecipient = this.otpRecipient;
    this.formError = '';

    const otpTokenRequest: OtpTokenRequest = {
      username: otpRecipient,
      messagingChannel: this.verificationMethod,
    };

    this._accountVerificationService
      .requestOtpToken(otpTokenRequest)
      .pipe(finalize(() => this.resetOtpForm()))
      .subscribe((response) => this._alertService.showMessage(response.message));
  }

  public resetOtpForm(): void {
    this.otpForm.reset();

    if (!this.otpFormRef) {
      return;
    }
    this.otpFormRef.setValue('');
  }
}
