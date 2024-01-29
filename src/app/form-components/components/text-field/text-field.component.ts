import {
  ChangeDetectionStrategy,
  Component,
  HostBinding,
  Input,
  Optional,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import { FormGroup, FormGroupDirective } from '@angular/forms';
import { TuiInputComponent } from '@taiga-ui/kit';
import { InputFieldSize } from '../../types';

export type TextFieldType = 'text' | 'email';

export interface TextFieldComponentInput {
  type: TextFieldType;
  size: InputFieldSize;
  name: string;
  label: string;
  placeholder: string;
  hasClear: boolean;
  autocomplete: string;
}

@Component({
  selector: 'app-text-field',
  templateUrl: './text-field.component.html',
  styleUrls: ['./text-field.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TextFieldComponent implements TextFieldComponentInput {
  @Input() public type: TextFieldType = 'text';
  @Input() public size: InputFieldSize = 'm';
  @Input() public name = '';
  @Input() public label = '';
  @Input() public placeholder = '';
  @Input() public hasClear = true;
  @Input() public autocomplete = 'on';

  @ViewChild(TuiInputComponent) private _inputRef?: TuiInputComponent;
  @HostBinding('class') private _classes = 'block input-text-field-wrapper';

  public constructor(@Optional() private readonly _formGroupDirective: FormGroupDirective) {}

  protected get formGroup(): FormGroup | null {
    return this._formGroupDirective?.form || null;
  }

  public focusInput(preventScroll: boolean) {
    this._inputRef?.nativeFocusableElement?.focus({ preventScroll: preventScroll });
  }
}
