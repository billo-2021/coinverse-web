import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Inject,
  Input,
  OnInit,
  Output,
  Self,
  SkipSelf,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import { FormGroup } from '@angular/forms';
import { OtpInputComponent } from '../../../../form-components/components/otp-input/otp-input.component';
import { debounce, filter, interval, takeUntil, tap } from 'rxjs';
import { otpLengthToken } from '../../../../core/config';
import { OtpForm } from '../../models';
import { OtpFormService } from '../../services';
import { DestroyService } from '../../../../core/services/destroy/destroy.service';
import { MessagingChannel } from '../../../../core/types';

@Component({
  selector: 'app-otp-form',
  templateUrl: './otp-form.component.html',
  styleUrls: ['./otp-form.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [DestroyService],
})
export class OtpFormComponent implements OnInit {
  @Input() public saveText = 'Submit';
  @Input() public cancelText = 'Resend OTP';
  @Input() public otpRecipient = '';
  @Input() public autoSave = false;
  @Input() public verificationMethod: MessagingChannel = 'email';

  @Output() public saveClicked = new EventEmitter<FormGroup<OtpForm>>();
  @Output() public cancelClicked = new EventEmitter<void>();
  @Input() public otpLength: number;
  protected readonly form: FormGroup<OtpForm>;
  @ViewChild('otpInput') private otpInputRef?: OtpInputComponent;

  public constructor(
    @Inject(otpLengthToken) private readonly _otpLengthToken: number,
    @SkipSelf() private readonly _otpForm$: OtpFormService,
    @Self() private readonly _destroy$: DestroyService
  ) {
    this.otpLength = _otpLengthToken;
    this.form = _otpForm$.value;
  }

  public ngOnInit(): void {
    if (!this.autoSave || !this.form) {
      return;
    }

    this.form.statusChanges
      .pipe(
        debounce(() => interval(250)),
        filter((status) => status === 'VALID'),
        tap(() => this.onSaveClicked()),
        takeUntil(this._destroy$)
      )
      .subscribe();
  }

  public onSaveClicked(): void {
    this.saveClicked.emit(this.form);
  }

  public onCancelClicked(): void {
    this.cancelClicked.emit();
  }

  public setValue(value: string): void {
    if (!this.otpInputRef) {
      return;
    }

    this.otpInputRef.setValue(value);
  }

  public focusInput(index: number): void {
    if (!this.otpInputRef) {
      return;
    }

    this.otpInputRef.focusInput(index);
  }

  private getMaskedOtpRecipient(): string {
    if (this.verificationMethod === 'email') {
      const [username, domain] = this.otpRecipient.split('@');

      const maskedUsername = this.maskFromStart(username, '.', 3);
      const maskedDomain = this.maskFromEnd(domain, '.', 3);

      return `${maskedUsername}@${maskedDomain}`;
    }

    const startPart = this.otpRecipient.substring(0, 3);
    const endPart = this.otpRecipient.substring(3);
    return `${startPart} ${this.maskFromStart(endPart, '.', endPart.length - 3)}`;
  }

  private maskFromStart(input: string, inputMask: string, count: number): string {
    return input
      .split('')
      .map((char, index) => (index < count ? inputMask : char))
      .join('');
  }

  private maskFromEnd(input: string, inputMask: string, count: number): string {
    return input
      .split('')
      .map((char, index) => (index >= input.length - count ? inputMask : char))
      .join('');
  }
}
