import {
  ChangeDetectionStrategy,
  Component,
  HostBinding,
  OnInit,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import {
  AccountVerificationService,
  AccountVerificationStoreService,
} from '../../../../common/domain-services';
import { OtpTokenRequest, VerifyAccountRequest } from '../../../../common/domain-models';
import { AlertService, NavigationService } from '../../../../core/services';
import { finalize } from 'rxjs';
import { OtpFormComponent } from '../../components/otp-form/otp-form.component';

@Component({
  selector: 'app-verify-account',
  templateUrl: './verify-account.component.html',
  styleUrls: ['./verify-account.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VerifyAccountComponent implements OnInit {
  @HostBinding('class') classes = 'full-width flex-col justify-center items-center';
  protected readonly OTP_LENGTH = 8;
  protected readonly VERIFICATION_METHOD = 'email';
  protected otpRecipient = '';

  protected otpForm = this._formBuilder.group({
    otp: ['', [Validators.required, Validators.minLength(this.OTP_LENGTH)]],
  });

  @ViewChild('otpFormRef') private otpFormRef?: OtpFormComponent;

  public constructor(
    private readonly _formBuilder: FormBuilder,
    private readonly _navigationService: NavigationService,
    private readonly _accountVerificationService: AccountVerificationService,
    private readonly _accountVerificationStore$: AccountVerificationStoreService,
    private readonly _alertService: AlertService
  ) {}

  ngOnInit(): void {
    const accountVerification = this._accountVerificationStore$.getValue();

    if (!accountVerification) {
      this._navigationService.to('root').then();
      return;
    }

    this.otpRecipient = accountVerification.emailAddress;
  }

  public onSubmitOtp(): void {
    const otp = this.otpForm.value.otp;

    if (!otp) {
      return;
    }

    const verifyAccountRequest: VerifyAccountRequest = {
      username: this.otpRecipient,
      token: otp,
    };

    this._accountVerificationService
      .verifyAccount(verifyAccountRequest)
      .pipe(finalize(() => this.resetOtpForm()))
      .subscribe(async (response) => {
        this._alertService.showMessage(response.message);
      });
  }

  public onResendOtp(): void {
    const otpTokenRequest: OtpTokenRequest = {
      username: this.otpRecipient,
      messagingChannel: this.VERIFICATION_METHOD,
    };

    this._accountVerificationService
      .requestOtpToken(otpTokenRequest)
      .pipe(
        finalize(() => {
          this.otpForm.reset();
        })
      )
      .subscribe((response) => {
        this._alertService.showMessage(response.message);
      });
  }

  public resetOtpForm(): void {
    if (!this.otpFormRef) {
      return;
    }

    this.otpForm.reset();
    this.otpFormRef.setValue('');
  }
}
