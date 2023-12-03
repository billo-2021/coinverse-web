import {
  ChangeDetectionStrategy,
  Component,
  HostBinding,
  Input,
  Optional,
  ViewEncapsulation,
} from '@angular/core';
import { AbstractControl, FormGroup, FormGroupDirective } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';

export type SizeType = 's' | 'm' | 'l';

@Component({
  selector: 'app-phone-number-field',
  templateUrl: './phone-number-field.component.html',
  styleUrls: ['./phone-number-field.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PhoneNumberFieldComponent {
  @Input() public size: SizeType = 'm';
  @Input() public name = '';
  @Input() public label = '';
  @Input() public placeholder = '';
  @Input() public countryCode = '+27';
  @Input() public phoneMaskAfterCountryCode = '(###) ###-##-##';
  @Input() public hasClear = true;

  private _disabled = new BehaviorSubject<boolean>(false);

  public constructor(@Optional() private readonly _formGroupDirective: FormGroupDirective) {}

  @Input()
  public set isDisabled(value: boolean) {
    this._disabled.next(value);
  }

  @Input()
  public set classNames(value: string) {
    this._classes = value;
  }

  private _classes = '';

  @HostBinding('class')
  protected get classes(): string {
    return `input-text-field-wrapper ${this._classes}`;
  }

  protected get formGroup(): FormGroup<Record<string, AbstractControl<unknown, unknown>>> {
    return this._formGroupDirective?.form || null;
  }

  protected get formControl(): AbstractControl<unknown> | null {
    return this.formGroup?.controls[this.name] || null;
  }
}
