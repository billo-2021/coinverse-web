import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { BaseComponent } from '../../../../common/components';
import { FormGroup } from '@angular/forms';
import { OtpInputComponent } from '../../../../form-components/components/otp-input/otp-input.component';
import { debounce, filter, interval, tap } from 'rxjs';

@Component({
  selector: 'app-otp-form',
  templateUrl: './otp-form.component.html',
  styleUrls: ['./otp-form.component.scss'],
})
export class OtpFormComponent extends BaseComponent implements OnInit {
  @Input() public form?: FormGroup;
  @Input() public saveText = 'Submit';
  @Input() public cancelText = 'Resend OTP';
  @Input() public otpRecipient = '';
  @Input() public autoSave = false;
  @Output() public saveClicked = new EventEmitter<FormGroup>();
  @Output() public cancelClicked = new EventEmitter<void>();
  protected readonly OTP_LENGTH = 8;
  @Input() public otpLength = this.OTP_LENGTH;

  @ViewChild('otpInput') private otpInputRef?: OtpInputComponent;

  public constructor() {
    super();
  }

  public ngOnInit(): void {
    if (!this.autoSave || !this.form) {
      return;
    }

    this.form.statusChanges
      .pipe(
        debounce(() => interval(250)),
        filter((status) => status === 'VALID'),
        tap(() => this.onSaveClicked())
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
}
