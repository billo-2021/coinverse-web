import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  HostBinding,
  Inject,
  Input,
  Optional,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import { FormControl, FormGroup, FormGroupDirective } from '@angular/forms';
import { FOCUS_OPTIONS_TOKEN, FocusOptions } from '../../../shared';
import { NgOtpInputComponent } from 'ng-otp-input';

export interface OtpInputComponentInput {
  name: string;
  label: string;
  length: number;
  allowNumbersOnly: boolean;
}

@Component({
  selector: 'app-otp-input',
  templateUrl: './otp-input.component.html',
  styleUrls: ['./otp-input.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OtpInputComponent implements OtpInputComponentInput {
  @Input() public name = '';
  @Input() public label = '';
  @Input() public length = 8;
  @Input() public allowNumbersOnly = true;

  @ViewChild('ngOtpInput') ngOtpInputRef?: NgOtpInputComponent;

  @HostBinding('class') private _classes = 'block';

  public constructor(
    @Inject(FOCUS_OPTIONS_TOKEN) private readonly _focusOptionsToken: FocusOptions,
    private readonly _changeDetectorRef: ChangeDetectorRef,
    @Optional() private readonly _formGroupDirective: FormGroupDirective
  ) {}

  protected get formGroup(): FormGroup | null {
    return this._formGroupDirective?.form || null;
  }

  protected get formControl(): FormControl | null {
    return (this.formGroup?.controls[this.name] as FormControl) || null;
  }

  public setValue(value: string): void {
    if (!this.ngOtpInputRef) {
      return;
    }

    this.ngOtpInputRef.setValue(value);
    const elementId = this.ngOtpInputRef.getBoxId(0);
    this.ngOtpInputRef.focusTo(elementId);
  }

  public focus(options?: FocusOptions): void {
    const { itemToFocusIndex } = options ?? this._focusOptionsToken;
    if (
      !this.ngOtpInputRef ||
      typeof itemToFocusIndex === 'undefined' ||
      itemToFocusIndex < 0 ||
      itemToFocusIndex >= this.length
    ) {
      return;
    }

    const elementId = this.ngOtpInputRef.getBoxId(itemToFocusIndex);
    this.ngOtpInputRef.focusTo(elementId);
    this._changeDetectorRef.detectChanges();
  }
}
