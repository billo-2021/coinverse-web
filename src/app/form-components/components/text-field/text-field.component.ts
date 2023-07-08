import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  forwardRef,
  Input,
  ViewEncapsulation
} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from "@angular/forms";

export type AppearanceType = 'fill' | 'outline';

export type NoneAffixType = { type: 'none' };
export type TextAffixType = { type: 'text' } & { text: string };
export type IconAffixType = { type: 'icon' } & { iconName: string };

@Component({
  selector: 'app-text-field',
  templateUrl: './text-field.component.html',
  styleUrls: ['./text-field.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => TextFieldComponent),
      multi: true
    }
  ],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {'class': 'input-text-field-wrapper'}
})
export class TextFieldComponent implements ControlValueAccessor {
  @Input() public id?: string;
  @Input() public label?: string;
  @Input() public placeholder?: string;
  @Input() public isDisabled = false;
  @Input() public appearance: AppearanceType = 'outline';
  @Input() public isRequired = false;
  @Input() public prefix: NoneAffixType | IconAffixType | TextAffixType = {type: 'none'};
  @Input() public postFix: NoneAffixType | IconAffixType | TextAffixType = {type: 'none'};

  public constructor(private changeDetectorRef: ChangeDetectorRef) {
    // this.name = RandomUtil.generateRandomString();
    // this.label = '';
    // this.control = new FormControl('');
    // this.placeholder = '';
  }

  private _value?: string | null;

  public set value(value: string | undefined | null) {
    this._value = value;
  }

  public onChange = () => {
  }

  public onTouched = () => {
  }

  ngAfterViewInit(): void {
    // console.log("yes", this.formControlName);
    // if (!this.formControlName) {
    //   return;
    // }
    //
    // this.formGroupDirective.getControl();
    // this.formGroupDirective.addControl(this.formControlName);

    // if (!this.formGroupDirective || !this.formControlName) {
    //   return;
    // }
    //
    // this.control = this.formGroupDirective.getControl(this.formControlName);
    //
    // if (this.isRequired) {
    //   console.log('Added validators');
    //   this.control.addValidators([Validators.required]);
    //   this.control.updateValueAndValidity();
    //   console.log('After adding validators', this.control);
    // }
  }

  ngOnInit(): void {
  }

  registerOnChange(onChange: any): void {
    this.onChange = onChange;
  }

  registerOnTouched(onTouched: any): void {
    this.onTouched = onTouched;
  }

  setDisabledState(isDisabled: boolean): void {
    this.isDisabled = isDisabled;
  }

  writeValue(value: string | undefined | null): void {
    this._value = value;

    if (this.changeDetectorRef) {
      this.changeDetectorRef.markForCheck();
    }
  }
}
