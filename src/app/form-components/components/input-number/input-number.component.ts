import {
  ChangeDetectionStrategy,
  Component,
  Input,
  Optional,
  ViewEncapsulation,
} from '@angular/core';
import { AbstractControl, FormGroup, FormGroupDirective } from '@angular/forms';
import { SizeType } from '../text-field/text-field.component';
import { BehaviorSubject } from 'rxjs';

type DecimalType = 'not-zero' | 'always' | 'never';

@Component({
  selector: 'app-input-number',
  templateUrl: './input-number.component.html',
  styleUrls: ['./input-number.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InputNumberComponent {
  @Input() public size: SizeType = 'm';
  @Input() public name = '';
  @Input() public label = '';
  @Input() public hasClear = true;
  @Input() public autocomplete = 'on';
  @Input() public prefix = '';
  @Input() public precision = 2;
  @Input() public decimal: DecimalType = 'not-zero';

  private _disabled = new BehaviorSubject<boolean>(false);

  public constructor(@Optional() private readonly _formGroupDirective: FormGroupDirective) {}

  @Input()
  public set isDisabled(value: boolean) {
    this._disabled.next(value);
  }

  protected get formGroup(): FormGroup<Record<string, AbstractControl<unknown, unknown>>> {
    return this._formGroupDirective?.form || null;
  }

  protected get formControl(): AbstractControl<unknown> | null {
    return this.formGroup?.controls[this.name] || null;
  }
}
