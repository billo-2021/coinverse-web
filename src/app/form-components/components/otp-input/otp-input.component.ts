import {
  ChangeDetectionStrategy,
  Component,
  HostBinding,
  Input,
  Optional,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import { FormControl, FormGroup, FormGroupDirective } from '@angular/forms';
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

  public constructor(@Optional() private readonly _formGroupDirective: FormGroupDirective) {}

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

  public focusInput(index: number): void {
    if (!this.ngOtpInputRef || index < 0 || index >= this.length) {
      return;
    }

    const elementId = this.ngOtpInputRef.getBoxId(index);
    this.ngOtpInputRef.focusTo(elementId);
  }
}
