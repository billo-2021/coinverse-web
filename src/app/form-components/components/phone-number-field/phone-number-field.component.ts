import {
  ChangeDetectionStrategy,
  Component,
  HostBinding,
  Input,
  Optional,
  ViewEncapsulation,
} from '@angular/core';
import { AbstractControl, FormGroup, FormGroupDirective } from '@angular/forms';
import { InputFieldSize } from '../../types';

export interface PhoneNumberComponentInput {
  size: InputFieldSize;
  name: string;
  label: string;
  placeholder: string;
  countryCode: string;
  phoneMaskAfterCountryCode: string;
  hasClear: boolean;
}

@Component({
  selector: 'app-phone-number-field',
  templateUrl: './phone-number-field.component.html',
  styleUrls: ['./phone-number-field.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PhoneNumberFieldComponent implements PhoneNumberComponentInput {
  @Input() public size: InputFieldSize = 'm';
  @Input() public name = '';
  @Input() public label = '';
  @Input() public placeholder = '';
  @Input() public countryCode = '+27';
  @Input() public phoneMaskAfterCountryCode = '(###) ###-##-##';
  @Input() public hasClear = true;

  @HostBinding('class') private _classes = 'block input-text-field-wrapper';

  public constructor(@Optional() private readonly _formGroupDirective: FormGroupDirective) {}

  protected get formGroup(): FormGroup<Record<string, AbstractControl<unknown, unknown>>> {
    return this._formGroupDirective?.form || null;
  }
}
