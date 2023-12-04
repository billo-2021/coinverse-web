import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  HostBinding,
  Inject,
  OnInit,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';

import { FormGroup } from '@angular/forms';
import { finalize, Subject } from 'rxjs';

import {
  AlertService,
  ApiError,
  MessagingChannel,
  verificationMethodToken,
} from '../../../../core';

import {
  AccountVerificationService,
  AccountVerificationStoreService,
  NavigationService,
} from '../../../../common';

import {
  OtpTokenRequest,
  VerifyAccountRequest,
} from '../../../../common/domain-models/authentication';

import { OtpForm } from '../../models';
import { OtpFormService } from '../../services';
import { OtpFormComponent } from '../../components/otp-form/otp-form.component';

@Component({
  selector: 'app-verify-account',
  templateUrl: './verify-account.component.html',
  styleUrls: ['./verify-account.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VerifyAccountComponent implements OnInit, AfterViewInit {
  protected otpRecipient = '';
  protected readonly otpForm: FormGroup<OtpForm>;
  protected readonly formError$ = new Subject<string>();
  protected readonly verificationMethod: MessagingChannel;
  @HostBinding('class') private _classes = 'block col-12 col-md-10 m-auto';
  @ViewChild('otpFormRef') private otpFormRef?: OtpFormComponent;

  public constructor(
    private readonly _changeDetectorRef: ChangeDetectorRef,
    @Inject(verificationMethodToken) private readonly _verificationMethodToken: MessagingChannel,
    private readonly _otpForm$: OtpFormService,
    private readonly _navigationService: NavigationService,
    private readonly _accountVerificationService: AccountVerificationService,
    private readonly _accountVerificationStore$: AccountVerificationStoreService,
    private readonly _alertService: AlertService
  ) {
    this.otpForm = _otpForm$.value;
    this.verificationMethod = _verificationMethodToken;
  }

  ngOnInit(): void {
    const accountVerification = this._accountVerificationStore$.getValue();

    if (!accountVerification) {
      this._navigationService.to('root').then();
      return;
    }

    this.otpRecipient = accountVerification.username;
  }

  ngAfterViewInit(): void {
    if (!this.otpFormRef) {
      return;
    }

    this.otpFormRef.focusInput(0);
    this._changeDetectorRef.detectChanges();
  }

  public onSubmitOtp(): void {
    this.formError$.next('');
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
      .subscribe({
        next: (response) => {
          this._alertService.showMessage(response.message);
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

  public onResendOtp(): void {
    this.formError$.next('');

    const otpTokenRequest: OtpTokenRequest = {
      username: this.otpRecipient,
      messagingChannel: this.verificationMethod,
    };

    this._accountVerificationService
      .requestOtpToken(otpTokenRequest)
      .pipe(
        finalize(() => {
          this.resetOtpForm();
        })
      )
      .subscribe((response) => {
        this._alertService.showMessage(response.message);
      });
  }

  public resetOtpForm(): void {
    this.otpForm.reset();

    if (!this.otpFormRef) {
      return;
    }
    this.otpFormRef.setValue('');
  }
}
