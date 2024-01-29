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

export type InputCardType = 'text' | 'email';

export interface InputCardComponentInput {
  type: InputCardType;
  size: InputFieldSize;
  cardNumberName: string;
  expiryDateName: string;
  cvcName: string;
  cardNumberLabel: string;
  expiryDateLabel: string;
  cvcLabel: string;
  hasClear: boolean;
  autocompleteEnabled: boolean;
}

@Component({
  selector: 'app-input-card',
  templateUrl: './input-card.component.html',
  styleUrls: ['./input-card.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InputCardComponent implements InputCardComponentInput {
  @Input() public type: InputCardType = 'text';
  @Input() public size: InputFieldSize = 'm';
  @Input() public cardNumberName = 'cardNumber';
  @Input() public expiryDateName = 'expiryDate';
  @Input() public cvcName = 'securityCode';
  @Input() public cardNumberLabel = 'Card Number';
  @Input() public expiryDateLabel = 'Expiry Date';
  @Input() public cvcLabel = 'Security Code';
  @Input() public hasClear = true;
  @Input() public autocompleteEnabled = true;

  @HostBinding('class') private _classes = 'block';

  public constructor(@Optional() private readonly _formGroupDirective: FormGroupDirective) {}

  protected get formGroup(): FormGroup<Record<string, AbstractControl<unknown, unknown>>> {
    return this._formGroupDirective?.form || null;
  }
}
