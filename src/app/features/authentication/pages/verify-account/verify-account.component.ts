import {
  ChangeDetectionStrategy,
  Component,
  HostBinding,
  OnInit,
  ViewChild,
  ViewEncapsulation
} from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import {
  AccountVerificationService,
  AccountVerificationStoreService,
} from '../../../../common/domain-services';
import { OtpTokenRequest, VerifyAccountRequest } from '../../../../common/domain-models';
import { AlertService } from '../../../../core/services';
import { finalize } from 'rxjs';
import { OtpFormComponent } from '../../components/otp-form/otp-form.component';
import { Router } from '@angular/router';
import { webRoutesConfig } from '../../../../common/config/web-routes-config';

@Component({
  selector: 'app-verify-account',
  templateUrl: './verify-account.component.html',
  styleUrls: ['./verify-account.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class VerifyAccountComponent implements OnInit {
  @HostBinding('class') classes = 'full-width flex-col justify-center items-center';
  protected readonly OTP_LENGTH = 8;
  protected readonly VERIFICATION_METHOD = 'email';
  protected otpRecipient = '';

  protected otpForm = this.formBuilder.group({
    otp: ['', [Validators.required, Validators.minLength(this.OTP_LENGTH)]],
  });

  @ViewChild('otpFormRef') private otpFormRef?: OtpFormComponent;

  public constructor(
    private readonly formBuilder: FormBuilder,
    private readonly router: Router,
    private readonly accountVerificationService: AccountVerificationService,
    private readonly accountVerificationStore: AccountVerificationStoreService,
    private readonly alertService: AlertService
  ) {
  }

  ngOnInit(): void {
    const accountVerification = this.accountVerificationStore.accountVerification;

    if (!accountVerification) {
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

    this.accountVerificationService
      .verifyAccount(verifyAccountRequest)
      .pipe(finalize(() => this.resetOtpForm()))
      .subscribe(async (response) => {
        this.alertService.showMessage(response.message);
        await this.router.navigate([webRoutesConfig.root]);
      });
  }

  public onResendOtp(): void {
    const otpTokenRequest: OtpTokenRequest = {
      username: this.otpRecipient,
      messagingChannel: this.VERIFICATION_METHOD,
    };

    this.accountVerificationService
      .requestOtpToken(otpTokenRequest)
      .pipe(
        finalize(() => {
          this.otpForm.reset();
        })
      )
      .subscribe((response) => {
        this.alertService.showMessage(response.message);
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
