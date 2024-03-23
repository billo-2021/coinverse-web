import {
  ChangeDetectionStrategy,
  Component,
  HostBinding,
  Input,
  Optional,
  ViewEncapsulation,
} from '@angular/core';
import { AbstractControl, FormGroup, FormGroupDirective } from '@angular/forms';
import { SizeL } from '../../../shared';

export type CheckBoxSize = SizeL;

export interface CheckBoxComponentInput {
  size: CheckBoxSize;
  name: string;
  label: string;
}

@Component({
  selector: 'app-check-box',
  templateUrl: './check-box.component.html',
  styleUrls: ['./check-box.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CheckBoxComponent implements CheckBoxComponentInput {
  @Input() size: CheckBoxSize = 'm';
  @Input() public name = '';
  @Input() public label = '';

  @HostBinding('class') private _classes = 'block';

  public constructor(@Optional() private _formGroupDirective: FormGroupDirective) {}

  protected get formGroup(): FormGroup<Record<string, AbstractControl<unknown, unknown>>> {
    return this._formGroupDirective?.form || null;
  }
}
