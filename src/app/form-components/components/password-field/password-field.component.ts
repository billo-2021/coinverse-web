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
import { AbstractControl, FormGroup, FormGroupDirective } from '@angular/forms';
import { TuiInputPasswordComponent } from '@taiga-ui/kit';
import { InputFieldSize } from '../../types';
import { FOCUS_OPTIONS_TOKEN, FocusOptions } from '../../../shared';

export interface PasswordFieldComponentInput {
  size: InputFieldSize;
  name: string;
  label: string;
  placeholder: string;
  hasClear: boolean;
  autocomplete: string;
}

@Component({
  selector: 'app-password-field',
  templateUrl: './password-field.component.html',
  styleUrls: ['./password-field.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PasswordFieldComponent implements PasswordFieldComponentInput {
  @Input() public size: InputFieldSize = 'm';
  @Input() public name = '';
  @Input() public label = '';
  @Input() public placeholder = '';
  @Input() public hasClear = false;
  @Input() public autocomplete = 'current-password';

  @ViewChild(TuiInputPasswordComponent) private _inputPasswordRef?: TuiInputPasswordComponent;
  @HostBinding('class') private _classes = 'block';

  public constructor(
    @Inject(FOCUS_OPTIONS_TOKEN) private readonly _focusOptionsToken: FocusOptions,
    private readonly _changeDetectorRef: ChangeDetectorRef,
    @Optional() private readonly _formGroupDirective: FormGroupDirective
  ) {}

  protected get formGroup(): FormGroup<Record<string, AbstractControl<unknown, unknown>>> {
    return this._formGroupDirective?.form || null;
  }

  public focus(options?: FocusOptions): void {
    const { preventScroll } = options ?? this._focusOptionsToken;
    this._inputPasswordRef?.nativeFocusableElement?.focus({ preventScroll: preventScroll });
    this._changeDetectorRef.detectChanges();
  }
}
