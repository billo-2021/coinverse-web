import {
  ChangeDetectionStrategy,
  Component,
  Input,
  Optional,
  ViewEncapsulation,
} from '@angular/core';
import { AbstractControl, FormGroup, FormGroupDirective } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';

export type SizeType = 's' | 'm' | 'l';

@Component({
  selector: 'app-input-card',
  templateUrl: './input-card.component.html',
  styleUrls: ['./input-card.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InputCardComponent {
  @Input() public type: 'text' | 'email' = 'text';
  @Input() public size: SizeType = 'm';
  @Input() public cardNumberName = 'cardNumber';
  @Input() public expireName = 'expiryDate';
  @Input() public cvcName = 'securityCode';
  @Input() public cardNumberLabel = 'Card Number';
  @Input() public expireLabel = 'Expiry Date';
  @Input() public cvcLabel = 'Security Code';
  @Input() public hasClear = true;
  @Input() public autocompleteEnabled = true;

  private _disabled = new BehaviorSubject<boolean>(false);

  public constructor(@Optional() private readonly _formGroupDirective: FormGroupDirective) {}

  @Input()
  public set isDisabled(value: boolean) {
    this._disabled.next(value);
  }

  protected get formGroup(): FormGroup<Record<string, AbstractControl<unknown, unknown>>> {
    return this._formGroupDirective?.form || null;
  }

  protected get formControl(): AbstractControl<unknown>[] | null {
    return [
      this.formGroup?.controls[this.cardNumberName] || null,
      this.formGroup?.controls[this.expireName] || null,
      this.formGroup?.controls[this.cvcName] || null,
    ].filter((value) => !!value);
  }
}
