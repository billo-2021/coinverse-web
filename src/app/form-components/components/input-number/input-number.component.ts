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

export type DecimalType = 'not-zero' | 'always' | 'never';

export interface InputNumberComponentInput {
  size: InputFieldSize;
  name: string;
  label: string;
  hasClear: boolean;
  autocomplete: string;
  prefix: string;
  precision: number;
  decimal: DecimalType;
}

@Component({
  selector: 'app-input-number',
  templateUrl: './input-number.component.html',
  styleUrls: ['./input-number.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InputNumberComponent implements InputNumberComponentInput {
  @Input() public size: InputFieldSize = 'm';
  @Input() public name = '';
  @Input() public label = '';
  @Input() public hasClear = true;
  @Input() public autocomplete = 'on';
  @Input() public prefix = '';
  @Input() public precision = 2;
  @Input() public decimal: DecimalType = 'not-zero';

  @HostBinding('class') private _classes = 'block input-number';

  public constructor(@Optional() private readonly _formGroupDirective: FormGroupDirective) {}

  protected get formGroup(): FormGroup<Record<string, AbstractControl<unknown, unknown>>> {
    return this._formGroupDirective?.form || null;
  }
}
