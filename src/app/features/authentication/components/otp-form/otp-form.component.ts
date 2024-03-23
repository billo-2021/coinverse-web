import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  HostBinding,
  Inject,
  Injectable,
  Input,
  Optional,
  Output,
  Self,
  SkipSelf,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { debounce, distinctUntilChanged, filter, interval, takeUntil, tap } from 'rxjs';
import {
  AUTH_CONFIG_TOKEN,
  AuthConfig,
  DestroyState,
  FormBase,
  FormValidators,
  MessagingChannel,
} from '../../../../shared';
import { OtpInputComponent } from '../../../../form-components';

export interface OtpForm {
  readonly otp: FormControl<string>;
}

export interface OtpFormComponentInput {
  saveText: string;
  cancelText: string;
  otpRecipient: string;
  otpLength: number;
  verificationMethod: MessagingChannel;
  autoSave: boolean;
}

export interface OtpFormComponentOutput {
  saveClicked: EventEmitter<FormBase<OtpForm>>;
  cancelClicked: EventEmitter<void>;
}

export function getOtpForm(otpLength: number): OtpForm {
  return {
    otp: new FormControl<string>('', FormValidators.OtpLength(otpLength)),
  };
}

@Injectable()
export class OtpFormService extends FormBase<OtpForm> {
  public constructor(@Inject(AUTH_CONFIG_TOKEN) private readonly _authConfig: AuthConfig) {
    super(getOtpForm(_authConfig.otpLength));
  }
}

@Component({
  selector: 'app-otp-form',
  templateUrl: './otp-form.component.html',
  styleUrls: ['./otp-form.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [DestroyState],
})
export class OtpFormComponent implements OtpFormComponentInput, OtpFormComponentOutput {
  @Input() public saveText = 'Submit';
  @Input() public cancelText = 'Resend OTP';
  @Input() public otpRecipient = '';
  @Input() public autoSave = false;
  @Input() public verificationMethod: MessagingChannel = this._authConfig.verificationMethod;
  @Input() public otpLength: number = this._authConfig.otpLength;

  @Output() public saveClicked = new EventEmitter<FormBase<OtpForm>>();
  @Output() public cancelClicked = new EventEmitter<void>();

  public readonly form: FormBase<OtpForm> =
    this._otpForm ?? new FormBase<OtpForm>(getOtpForm(this.otpLength));

  @ViewChild('otpInput') private otpInputRef?: OtpInputComponent;
  @HostBinding('class') private _classes = 'block';

  private readonly _effects$ = this.form.statusChanges.pipe(
    debounce(() => interval(250)),
    filter((status) => status === 'VALID'),
    distinctUntilChanged(),
    tap(() => {
      if (this.autoSave) {
        this.onSaveClicked();
      }
    }),
    takeUntil(this.destroyState)
  );

  public constructor(
    @Inject(AUTH_CONFIG_TOKEN) private readonly _authConfig: AuthConfig,
    @Optional() @SkipSelf() private readonly _otpForm: OtpFormService | null,
    @Self() private readonly destroyState: DestroyState
  ) {
    this._effects$.subscribe();
  }

  protected get formGroup(): FormGroup<OtpForm> {
    return this.form;
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

  public focus(index?: number): void {
    if (!this.otpInputRef) {
      return;
    }

    this.otpInputRef.focus({ itemToFocusIndex: index });
  }
}
